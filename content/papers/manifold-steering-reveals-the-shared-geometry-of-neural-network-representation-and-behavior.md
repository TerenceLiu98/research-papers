---
title: Manifold Steering Reveals the Shared Geometry of Neural Network Representation and Behavior
type: paper
authors:
  - Daniel Wurgaft
  - Can Rager
  - Matthew Kowal
  - Vasudev Shyam
  - Sheridan Feucht
  - Usha Bhalla
  - Tal Haklay
  - Eric Bigelow
  - Raphael Sarfati
  - Thomas McGrath
  - Owen Lewis
  - Jack Merullo
  - Noah D. Goodman
  - Thomas Fel
  - Atticus Geiger
  - Ekdeep Singh Lubana
year: null
repository: https://github.com/goodfire-ai/causalab/tree/manifold_steering
source_job_id: "821c6424-82ce-4192-9f0e-669f8a19ba09"
tags:
  - mechanistic-interpretability
  - representation-geometry
  - activation-steering
---

## TL;DR

Activation geometry predicts how interventions change model outputs in structured reasoning tasks. Steering along fitted activation manifolds produces smoother conceptual transitions and lower distance from natural output distributions than straight-line steering. Optimizing activations to match behavior-manifold paths also partially recovers activation curvature. Evidence spans calendar and sequential arithmetic, graphs learned in context, and a small visual world model; it does not yet establish general control of open-ended generation.

## Research Question

Do curved activation representations causally constrain model behavior, and can the geometry of natural output distributions recover the geometry of internal representations?

## Motivation

Linear steering treats the ambient activation space as flat. When a concept occupies a curved manifold, a chord between valid representations can cross regions that do not correspond to natural intermediate states. The paper tests whether respecting that curvature improves [[concepts/model-steerability|Model Steerability]], moving beyond visualization to interventions in both the activation-to-behavior and behavior-to-activation directions.

## Contributions

- Fits activation and behavior manifolds and compares their pairwise path distances, finding strong correlations across cyclic, sequential, and graph-structured tasks.
- Introduces [[concepts/manifold-steering|Manifold Steering]] and measures how closely its induced output paths follow naturally occurring behavior.
- Optimizes activation paths against behavior-manifold targets, recovering curvature more faithfully than linear chords.
- Frames steering through Euclidean, activation-density, and behavior-pullback metrics, and demonstrates coordinate-wise control on two-dimensional graph manifolds.

## Method

**Manifold estimation.** Most language experiments use Llama 3.1 8B, layer 28, at the final-token residual stream. Activations are projected into 64 PCA dimensions and averaged by target concept. Natural or periodic cubic splines interpolate sequential or cyclic centroids; thin-plate splines fit graph surfaces. Sequential and graph coordinates use known task structure; cyclic coordinates are derived from angles in the first two PCs (Appendix A.3).

Behavior distributions aggregate vocabulary probabilities over concept-token variants plus an off-concept "other" bin. The square-root map gives Hellinger distance

$$
d_H(p,q)=\frac{1}{\sqrt{2}}\|\sqrt p-\sqrt q\|_2.
$$

Behavior centroids are mapped to a sphere's tangent plane for spline fitting and returned with the exponential map before squaring. Distance comparisons accumulate Euclidean activation distances and Hellinger behavior distances along sampled paths (Appendices A.4-A.5).

**Interventions.** A straight path interpolates activation centroids directly. A manifold path interpolates intrinsic coordinates and decodes through the fitted manifold. The natural-domain evaluation uses 50 waypoints, 16 fixed base prompts, and up to 50 centroid pairs. Appendix A.6 specifies an important protocol difference: manifold steering replaces only the top-64 PCA components while retaining the base prompt's orthogonal residual; linear steering replaces the full residual-stream activation.

Behavioral naturalness is measured by cumulative Bhattacharyya distance to the nearest behavior-manifold point,

$$
D_{BC}(p,q)=-\log\sum_i\sqrt{p_iq_i}.
$$

Although Equation 3 presents an integral, the reported implementation sums over 50 waypoints, then averages across prompts and reports mean and standard error across endpoint pairs (Appendix A.7).

**Reverse optimization.** Pullback experiments target 20 distributions along a behavior-manifold path. L-BFGS adjusts ten spline control vectors in the first 32 PCA components to minimize squared Hellinger error, with other components fixed to the base prompt. Recovery is scored by closest-point residuals after projection into a basis capturing 99% of the reference activation path's variance. Its comparator is a straight chord in the 64-dimensional PCA subspace, not the full-residual intervention baseline above (Appendices A.8-A.9).

**Geometric framework.** Section 3.4 contrasts a flat identity metric, a conformal metric that makes low-density activation regions expensive, and a regularized pullback metric $J_F^\top g_yJ_F+\epsilon I$ derived from behavior. This formalizes a family of geometric steering objectives; the empirical procedures use fitted splines and output-matching optimization.

## Experiments

Natural-domain tasks cover weekdays, months, letters, and ages. Table 1 reports 49, 84, 48, and 909 prompts, respectively. The following results combine Sections 2.3, 3.2, and 3.3. Energy is lower-is-better; recovery is higher-is-better. Uncertainties are standard errors.

| Task | Activation/behavior path-distance correlation | Chord/behavior-distance correlation | Manifold energy | Linear energy | Pullback recovery $R^2$ | Chord recovery $R^2$ |
| --- | --- | --- | --- | --- | --- | --- |
| Weekdays | 0.99 | 0.89 | $0.34\pm0.03$ | $0.93\pm0.11$ | $0.77\pm0.03$ | $0.42\pm0.07$ |
| Months | 0.89 | 0.53 | $0.36\pm0.01$ | $1.09\pm0.06$ | $0.75\pm0.04$ | $0.32\pm0.05$ |
| Letters | 0.999 | 0.71 | $2.42\pm0.07$ | $6.95\pm0.27$ | $0.78\pm0.04$ | $0.23\pm0.03$ |
| Ages | 0.999 | 0.36 | $5.21\pm0.09$ | $13.49\pm0.29$ | $0.47\pm0.05$ | $0.24\pm0.01$ |

The authors report an average 2.8-fold energy improvement and $p<0.001$ for each energy and recovery comparison. Manifold paths shift probability through adjacent concept values; linear paths often jump between distant values or increase off-concept mass.

**Graphs learned in context.** Random walks of 2,048 entity tokens introduce a $5\times5$ grid or $9\times9$ cylinder. Activation/behavior manifold-distance correlations are 0.99 for both, compared with 0.90 and 0.81 for activation chords. Interventions averaged over five prompts show coordinate-wise movement with little change along the other dimension; the cylinder reaches over 80% neighborhood probability mass (Section 4; Appendix C.1).

**Visual world model.** A convolutional encoder, GRU, and residual-image decoder predict Mountain Car frames. Encoder activations from 100 rollouts define a position manifold. Behavior is operationalized by a softmax over distances to activation-manifold position centers, rather than the decoder's native image distribution. Appendix C.3 reports arc-distance correlation 0.996 versus 0.06 for chords. Across 30 endpoint pairs, mean distance to the activation manifold is 2.22 for chords, 0.20 for geometric paths, and 0.29 for pullback paths. Pullback improves on the chord for all 30 pairs, with larger residual errors near the extreme wall. Decoded examples show smoother car placement under manifold steering (Figure 7).

**Uncertainty.** An additional Llama 3.1 70B layer-70 experiment groups weekday prompts by increment size. Ordered weekday transitions persist across groups with increasing output entropy, suggesting a possible control axis for uncertainty; it is not a general calibration benchmark (Appendix C.2).

## Limitations

- Tasks have simple, identifiable conceptual domains and mostly next-token outputs. Refusal, sycophancy, persuasion, sequence-level behavior, and intermediate algorithmic variables remain future work (Section 8).
- Manifold fitting depends on centroid labels and, for sequential and graph tasks, known intrinsic coordinates. Discovering navigable geometry from uncontrolled data is unresolved.
- The full-residual linear baseline and subspace-preserving manifold intervention differ in more than path shape. Their comparison does not isolate curvature alone (Appendix A.6).
- High path-distance correlations support approximate geometric correspondence, not an exact global isometry theorem. Intrinsic-coordinate straight paths on a multidimensional fitted surface need not be globally shortest geodesics; Appendix A.5 estimates their arc lengths.
- Naturalness means proximity to a fitted task-output manifold, not independently measured fluency or utility. In Mountain Car, the behavior map is explicitly constructed from activation distances, which limits its independence as corroborating evidence.
- Pullback recovery is partial, especially for ages, and uses restricted subspaces and a projected score. It does not establish unique identification of the full activation representation.
- The supplied Markdown gives no publication year or stable identifier for this paper; the year is left unset.

## Related Concepts

- [[concepts/manifold-steering|Manifold Steering]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/geodesic-distance|Geodesic Distance]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/world-models|World Models]]

## Related Papers

- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]]: cited as Engels et al. (2024), establishes calendar circles and earlier circular interventions; this paper adds explicit behavior manifolds and reverse path recovery.
- Park et al. (2025), "ICLR: In-context Learning of Representations": supplies the graph random-walk task family.
- Kantamneni and Tegmark (2025), "Language Models Use Trigonometry to Do Addition": related interventions on numerical helices.
- Park et al. (2026), "The Information Geometry of Softmax: Probing and Steering": contemporary geometric analysis of representation-to-output mappings in a simpler setting.
- Sarfati et al. (2026), "The Shape of Beliefs: Geometry, Dynamics, and Interventions Along Representation Manifolds of Language Models' Posteriors": related representation-manifold account of model beliefs.

[[index|Library home]]
