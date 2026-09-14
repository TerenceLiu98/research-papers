---
title: "Learning based 2D Irregular Shape Packing"
type: paper
authors:
  - Zeshi Yang
  - Zherong Pan
  - Manyi Li
  - Kui Wu
  - Xifeng Gao
year: 2023
doi: "10.1145/3618348"
venue: "ACM Transactions on Graphics, 42(6)"
tags:
  - geometry-processing
  - uv-packing
  - reinforcement-learning
  - combinatorial-optimization
---

## TL;DR

The paper improves [[concepts/uv-atlas-packing|UV Atlas Packing]] by learning to group irregular patches into nearly rectangular super-patches, then applying bin packing, joint geometric optimization, and small-patch hole filling. On three test datasets, average packing ratios are 0.827, 0.687, and 0.776, compared with XAtlas's 0.670, 0.588, and 0.688. The method preserves input patch shapes, but is substantially slower than XAtlas and does not outperform the baselines on every instance.

## Research Question

Can learned grouping, ordering, and pose selection improve the packing density of hundreds of irregular UV patches while preserving their geometry and avoiding exhaustive geometric search?

## Motivation

UV patches must share a texture atlas, so empty space wastes texture capacity. Fixed packing orders can produce poor arrangements, while enumerating collision-free placements with no-fit polygons is expensive. Methods that improve packing by changing mesh cuts or deforming patches also change upstream UV decisions. This work instead optimizes rigid transformations of the supplied planar triangular meshes, allowing patches with holes.

## Contributions

- A hierarchy that repeatedly combines small patch subsets into nearly rectangular super-patches before rectangular bin packing.
- A high-level group selector network (HSN) that ranks candidate subsets without running the full low-level packer on every candidate.
- A low-level sorter network (LSN) and pose network (LPN), trained with double deep Q-learning, coupled to collision-constrained local optimization.
- A complete assembly procedure with joint pose refinement and separate insertion of tiny patches into remaining gaps.
- Evaluation across three UV datasets, including transfer from General to Building and Object, component ablations, and runtime comparisons.

## Method

**Preprocessing and representation.** The largest patches accounting for 80% of total area form a salient subset. Patches smaller than one fifth of that subset's mean patch area are reserved for later hole filling. Each patch is rasterized to a 50 by 50 image and encoded by a shared fully convolutional network into 432 features. The default low-level horizon is four patches.

**Low-level packing (Sections 4.1-4.2).** LSN uses graph attention over patch features to select the next patch. LPN observes the packed super-patch and the ordered future patches, then selects one of 256 discrete actions: 16 patch orientations combined with 16 relative placement directions. A collision-free initialization is refined by minimizing the distance between patch centers of mass, subject to non-overlap. Barrier energy, Newton optimization, and line search enforce the geometric constraints. Both policies receive the final super-patch packing ratio as a terminal reward and are trained with double deep Q-learning, with LPN trained before LSN.

**Hierarchical grouping (Section 4.3).** HSN combines convolutional features, graph attention, and pooling, and is trained with a supervised margin-ranking loss using packing ratios produced by the low-level solver. Each grouping iteration samples 400 subsets, ranks them with HSN, and evaluates the best ten with the actual low-level packer. The best group is accepted only if it improves the paper's area-weighted packing score; otherwise grouping stops. Alpha shapes fill interior gaps in the temporary super-patch representation because the low-level action design approaches patches from outside.

**Final assembly (Section 4.4).** A Trimesh bin-packing routine assembles super-patches. Joint constrained optimization then reduces the enclosing rectangle's area using rigid patch motions. Finally, original patch geometry replaces the alpha-shape approximation, and a scanline algorithm inserts the reserved tiny patches into exposed gaps and holes. Default packing searches ten atlas aspect ratios between 1 and 2; a square-atlas variant is also evaluated. The implementation specifies one pixel of separation between patches.

## Experiments

The datasets contain XAtlas-unwrapped models: Building has 86 models with 5-131 patches, Object has 81 with 9-200 patches, and General has 221 Thingi10k models with 4-200 patches. Degenerate patches are removed. The paper reports a 70% training and 30% testing split for each dataset, with millions of small packing instances sampled from the models for low-level training.

Table 1 reports these **mean packing ratios**; higher is better. The fixed-square and General-trained columns are distinct variants.

| Test dataset | Sander et al. (2003) | XAtlas | NFP heuristic | Full method | Fixed square | General-trained |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Building | 0.675 | 0.670 | 0.707 | 0.827 | 0.801 | 0.805 |
| Object | 0.609 | 0.588 | 0.630 | 0.687 | 0.680 | 0.682 |
| General | 0.652 | 0.688 | 0.690 | 0.776 | 0.757 | Not separately reported |

The full method exceeds the strongest baseline mean by 12.0, 5.7, and 8.6 percentage points, respectively, calculated from Table 1. These explicit differences are more precise than the paper's general description of a 5%-10% improvement. Training only on General retains higher mean ratios than the listed baselines on Building and Object; this establishes transfer within the tested UV datasets.

HSN correctly ranks 90.8%, 86.9%, and 84.6% of evaluated patch pairs on Building, Object, and General. Table 2 reports a mean ratio of 0.686 for the low-level solver on 2,500 small random problems, versus 0.651 for XAtlas, 0.618 for Sander et al., and 0.582 for NFP. Table 3 favors horizon four (0.776) over horizons two, three, and five (0.741, 0.771, and 0.770).

The General ablation in Table 4 reports 0.448 without hierarchical grouping, 0.700 for NFP plus HSN, 0.725 for a continuous-action LPN variant, and 0.744 without separate tiny-patch hole filling, compared with 0.776 for the full pipeline. The authors report that the horizon-ten policy used without grouping fails to converge. The continuous-action variant also changes the training algorithm to PPO, so that comparison does not isolate action discretization alone.

On General, reported average packing times are 37.76 for the proposed method, 1.81 for XAtlas, 33.52 for Sander et al., and 93.62 for NFP. The supplied Markdown corrupts the time-unit glyph, so no unit is assigned here. Hole filling accounts for 52.9% of the reported runtime breakdown and is implemented in Python. The authors report approximately linear scaling with patch count in experiments from 50 to 300 patches and also demonstrate a 784-chart instance.

## Limitations

- Greedy grouping and local pose optimization can settle in local optima. The paper includes examples where its packing is inferior to baselines and offers no global optimality guarantee.
- The low-level action space cannot directly insert patches into interior gaps. Alpha-shape simplification and later small-patch filling manage this restriction rather than removing it.
- HSN ranking accuracy declines for more complex shapes and super-patches. Transfer evidence is limited to the three tested UV datasets.
- Higher mean density comes with slower packing than XAtlas. Runtime comparisons also involve different implementation choices, including a Python reimplementation of Sander et al. and Python hole filling.
- Atlas aspect ratio affects packing quality; the square variant loses some density. Degenerate inputs are excluded, and broader input robustness is not established by these experiments.
- The parsed source contains damaged mathematical symbols and time units. This summary retains unambiguous algorithm descriptions and table values without reconstructing uncertain notation. Confidence intervals and repeated-run variability are not reported in the presented result tables.

## Related Concepts

- [[concepts/uv-atlas-packing|UV Atlas Packing]]
- No-fit polygons and Minkowski sums
- Reinforcement learning for combinatorial optimization
- Graph attention networks
- Collision-constrained geometric optimization

## Related Papers

These works are cited in the supplied paper; no matching pages were found in the current library.

- Fang et al. (2023), "A Hybrid Reinforcement Learning Algorithm for 2D Irregular Packing Problems": learns shape selection while retaining geometric pose computation.
- Goyal and Deng (2020), "Packit: A virtual environment for geometric planning": a learned packing comparator discussed in the related work.
- Sander et al. (2003), "Multi-chart geometry images": the source of one evaluated packing baseline.
- Bennell and Song (2008), "A comprehensive and robust procedure for obtaining the nofit polygon using Minkowski sums": geometric machinery underlying the NFP baseline.
- Liu et al. (2019), "Atlas Refinement with Bounded Packing Efficiency": an alternative that changes patch geometry to improve atlas packing.

Source: [Publisher DOI](https://doi.org/10.1145/3618348), as given in the supplied manuscript.

[[index|Library home]]
