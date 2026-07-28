"""Cut and grade the source photographs into the slots the site expects.

Usage:  python3 scripts/prepare-photos.py <directory-with-originals>

Two things happen to every frame.

**Crop.** Four of the five sources are portrait while most slots are wide
strips, so a centre crop would decapitate them. Each job names the focal band
as a fraction of the source height and the cut is taken around that.

**Grade.** The duotone maps luminance straight onto two colours, so exposure
decides how a frame lands: a high-key shot — bright sky, white tents — has
most of its pixels near the top of the range and comes out an almost flat
coral wash, while a night shot comes out nearly all ink. Every crop is pulled
to the same mean luminance first, so each plate reaches the filter with a
comparable spread and the duotone does the same thing to all of them.

Filenames here must match the `src` paths in components/photos.ts.
"""

from PIL import Image, ImageOps
import math
import os
import sys

TARGET_MEAN = 0.42


def mean_luma(im):
    h = im.convert("L").histogram()
    n = im.size[0] * im.size[1]
    return sum(h[i] * i for i in range(256)) / (n * 255)


def normalise(im):
    im = ImageOps.autocontrast(im, cutoff=0.5)

    # mean(x**g) is not mean(x)**g, so solving the gamma in one step misses
    # on the bimodal histograms these frames have — a bright sky against a
    # dark crowd. Bisect on the measured mean instead; it converges in a
    # handful of passes and costs nothing at build time.
    lo, hi = 0.45, 3.2
    best = im
    for _ in range(14):
        gamma = (lo + hi) / 2
        table = [round(255 * ((i / 255) ** gamma)) for i in range(256)] * 3
        best = im.point(table)
        m = mean_luma(best)
        if abs(m - TARGET_MEAN) < 0.004:
            break
        if m > TARGET_MEAN:
            lo = gamma  # still too bright, push gamma up
        else:
            hi = gamma
    return best

SRC = sys.argv[1] if len(sys.argv) > 1 else "originals"
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "photos")

FESTIVAL = "53f244b1-ChatGPT_Image_30_mag_2026_18_20_31.png"
CANAL = "60185431-ChatGPT_Image_29_mag_2026_23_04_50.png"
AERIAL = "2f0d316e-ChatGPT_Image_29_mag_2026_22_51_58.png"
BAR = "f7b0c8c8-ChatGPT_Image_28_mag_2026_21_02_49.png"
RUN = "93b46a50-ChatGPT_Image_28_mag_2026_20_51_52.png"

WIDE = 16 / 7
LANDSCAPE = 3 / 2
PORTRAIT = 4 / 5

# name, source, target ratio, vertical focal point (0 = top, 1 = bottom)
JOBS = [
    # Home
    ("hero", FESTIVAL, LANDSCAPE, 0.50),
    ("problema", CANAL, WIDE, 0.60),
    ("soluzione", AERIAL, PORTRAIT, 0.55),
    ("bloopers", BAR, WIDE, 0.42),
    # Detail pages — second, different cuts of the same frames where a
    # source is reused, so no two plates repeat the same picture.
    ("problema-detail", RUN, WIDE, 0.55),
    ("soluzione-detail", AERIAL, WIDE, 0.70),
    ("flusso-detail", FESTIVAL, WIDE, 0.49),
    ("visione-detail", CANAL, WIDE, 0.22),
    ("bloopers-detail", BAR, WIDE, 0.70),
]

MAX_W = 1600

os.makedirs(OUT, exist_ok=True)

for name, src, ratio, focal in JOBS:
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    w, h = im.size

    # Take the full width and as much height as the ratio allows; if the
    # source is not tall enough, fall back to cropping the width instead.
    cw = w
    ch = round(w / ratio)
    if ch > h:
        ch = h
        cw = round(h * ratio)

    left = (w - cw) // 2
    top = round(focal * h - ch / 2)
    top = max(0, min(top, h - ch))

    im = im.crop((left, top, left + cw, top + ch))

    if im.size[0] > MAX_W:
        im = im.resize((MAX_W, round(MAX_W / ratio)), Image.LANCZOS)

    im = normalise(im)

    path = os.path.join(OUT, f"{name}.jpg")
    im.save(path, "JPEG", quality=82, optimize=True, progressive=True)
    kb = os.path.getsize(path) // 1024
    print(f"{name:18} {im.size[0]}x{im.size[1]}  {kb} KB")
