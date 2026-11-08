---
title: "Proving and Improving the Platonic Representation Hypothesis with JEPAs"
type: paper
authors:
  - Randall Balestriero
  - Yann LeCun
year: null
source_job_id: "784ee66e-211a-42d4-950d-85af0a0f7288"
tags:
  - representation-learning
  - multimodal-alignment
  - self-supervised-learning
  - joint-embedding
---

## TL;DR

This paper turns the [[concepts/platonic-representation-hypothesis|Platonic Representation Hypothesis]] into a sufficient-condition theorem for an idealized class of [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]. Separately trained modality encoders recover the same world embedding up to rotation when their positive pairs induce the same relations between world states and the population minimizer is unique up to rotation. Experiments argue that pairing distinct observations of one scene, called good views, produces substantially stronger vision-language alignment than corrupting one observation or using next-token prediction: on the same web-text corpus, good views reach next-token alignment with 42 times fewer samples.

## Research Question

Under what conditions do models trained separately on different modalities learn the same representation, and can those conditions provide a more efficient training recipe than relying on model and data scale alone?

## Motivation

Prior evidence for the Platonic Representation Hypothesis was observational: independently trained models became more similar with scale, but the hypothesis did not specify when convergence must occur or how to improve it. The paper studies positive-pair structure as the controllable mechanism. If different modalities define the same neighborhood graph over world states, their representation-learning problems can be viewed as the same objective in different observation coordinates.

## Contributions

- Proves a Platonic Representation Theorem: under injective modality renderings, shared positive-pair distributions, population optima, rotation-invariant objectives, and minimizers unique up to rotation, any number of separately trained modality encoders recover one world embedding up to modality-specific orthogonal transformations.
- Shows that a whitened squared-error JEPA learns a spectral embedding of its positive-pair graph and is unique up to rotation when the relevant eigenspace has a spectral gap.
- Bounds best-rotation misalignment between two spectral JEPAs by the mismatch between their normalized positive-pair kernels, scaled by the inverse eigengap.
- Formalizes how positive pairs made from corruptions of one observation can allocate representation dimensions to modality-specific nuisance variables, whereas independent observations of the same state remove that nuisance in the paper's latent-factor model.
- Rewrites next-token prediction as a two-encoder joint-embedding objective whose positives are a prefix and its continuation and whose log-partition acts as an anti-collapse term; unlike the spectral setting, its optimum is identifiable only up to a general invertible linear map.
- Reports an empirical alignment scaling law in the proportion of good views and number of samples, and demonstrates paired and pair-free uses of separately trained encoders.

## Method

### Shared-positive theorem

A finite world has states $z$ with distribution $p$, and modality $m$ observes an injective rendering $g_m(z)$. Each modality trains an encoder using a positive-pair distribution $\pi_m$ over pairs of world states. Because an injective rendering only changes coordinates, composing the encoder with $g_m$ yields an objective directly over the same world-state space.

If every modality uses the same $\pi$ and the world-space objective has minimizers unique up to rotation, then every optimal encoder satisfies

$$
f_m^*\circ g_m = Q_m h^*
$$

for one shared embedding $h^*$ and an orthogonal matrix $Q_m$. For squared embedding distance with centered, whitened outputs, $h^*$ is given by the leading nonconstant eigenvectors of the normalized positive-pair kernel. An eigengap after dimension $k$ makes that eigenspace unique up to rotation.

When two modalities use different positive kernels, a Davis-Kahan-style perturbation argument bounds their root-mean-square Procrustes error by the kernel difference divided by the reference kernel's eigengap. The result explains why alignment may concentrate in leading, well-separated spectral directions.

### Good views, bad views, and language modeling

The latent analysis separates a world state from observation-specific nuisance. Good views are two conditionally independent observations of the same state; bad views are two corruptions of one observation and therefore retain shared nuisance. In the spectral model, nuisance directions enter the top-$k$ embedding when they are more persistent under the positive kernel than some world directions.

The paper then expresses next-token cross-entropy as a context-target joint-embedding objective. A prefix and its continuation are its positive pair, while the softmax log-partition prevents trivial solutions. This establishes the objective form, but the paper treats the nuisance-based consequence as a prediction rather than a direct corollary because next-token prediction uses two encoders and is not the whitened spectral JEPA analyzed by the earlier theorem.

### Empirical design

Image and text encoders are trained separately. On Flickr30k and MSR-VTT, the authors compare good views from distinct captions or frames of one scene with bad views made from masked spans or crops of one observation and with next-token prediction. Larger text experiments use multiple texts associated with each Recap-DataComp image. Alignment is measured by mutual 10-nearest-neighbor overlap, linear CKA, and retrieval after fitting an orthogonal Procrustes map.

## Experiments

On Flickr30k, a separately trained good-view text JEPA reaches mutual 10-NN of .062 and image-to-caption R@1 of .044 against a small image JEPA, compared with .047/.027 for masked-span bad views and .042/.021 for next-token prediction. With frozen DINOv2 ViT-B and a rotation fitted on 1,014 validation pairs, the good-view text JEPA reaches R@1 .246, versus .133 for bad views and .118 for next-token prediction. Trimming captions is the most consequential tested view-design choice; removing it reduces mean R@1 from .246 to .185.

The web-scale comparison keeps encoder and corpus fixed. A 109M-parameter good-view text JEPA trained for 900M samples on texts associated with 940M images reaches .184 mutual 10-NN and .507 CKA with DINOv2 ViT-B on WIT-1024. The corresponding next-token model reaches .111 mutual 10-NN and the bad-view model .088. The good-view model also exceeds the evaluated Qwen2.5-72B result (.154 mutual 10-NN and .418 CKA) and Llama-3-70B result (.151 and .380) under that protocol. A good-view model reaches roughly the same WIT alignment with 21.6M samples that next-token prediction reaches with 900M, a reported 42-fold sample difference.

The fitted scaling law predicts 85 held-out runs with Flickr R@1 RMSE .0093, close to the .0096 pooled difference between rerun seeds. The authors caution that the law is empirical, its exponents are poorly identified, and it overpredicts good-view runs well beyond the fitted sample range.

For composition, an orthogonal map connects frozen image encoders to a text-only-trained caption decoder. The strongest reported setup reaches CIDEr .838 on COCO; only the linear map is fitted on image-caption pairs. In a separate pair-free alignment protocol, the 109M good-view JEPA paired with DINOv2 reaches 86.0% CIFAR-10 top-1, 67.2% CIFAR-100 top-5, and 64.4% ImageNet-100 top-5 after an unpaired geometry-matching procedure. These results depend on the external alignment procedure and do not mean that the theorem identifies a rotation from second moments alone.

## Limitations

- The main theorem assumes a finite world, injective modality renderings, population global optima, a shared positive-pair distribution, and uniqueness up to rotation. Lossy observations, finite-sample guarantees, and optimization dynamics are not covered.
- The formal JEPA uses an identity predictor and a rotation-invariant objective. It does not cover action-conditioned predictors used in many world models.
- The spectral uniqueness result applies to centered, whitened squared-error objectives with an eigengap. The experiments use LeJEPA's fuller SIGReg distributional regularizer, for which uniqueness is assumed rather than proved.
- The nuisance theorems use a structured latent-factor model. Their interpretation of next-token prediction is heuristic because the language-model optimum is identifiable up to $\mathrm{GL}(k)$ rather than only an orthogonal map.
- “Good” and “bad” describe whether positive views isolate a shared world state in this framework; real captions, alt-text, frames, and crops can mix world content with source-specific nuisance.
- Some web images overlap evaluation image collections, although the paper reports overlap checks and small score changes after exclusions. The broad benchmark comparisons still depend on model, data, layer-selection, and evaluation-protocol choices.
- The alignment scaling law summarizes one training recipe and fails for repeated-data good-view runs far outside its fitted range.
- Captioning and pair-free classification require additional mapping or decoding procedures. They demonstrate uses of aligned geometry rather than end-to-end multimodal learning without any cross-modal assumptions or data.
- The supplied manuscript does not state its own publication year, venue, DOI, or arXiv identifier; these remain unspecified.

## Related Concepts

- [[concepts/platonic-representation-hypothesis|Platonic Representation Hypothesis]]
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]
- [[concepts/slow-feature-analysis|Slow Feature Analysis]]
- [[concepts/structural-identifiability|Structural Identifiability]]
- [[concepts/universal-concept-spaces|Universal Concept Spaces]]

## Related Papers

- Huh et al. (2024), “Position: The Platonic Representation Hypothesis”: formulates the scaling-based convergence hypothesis and supplies the WIT alignment protocol used here.
- Balestriero and LeCun (2025), “LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics,” arXiv:2511.08544: supplies the practical alignment-plus-SIGReg objective.
- [[papers/when-does-lejepa-learn-a-world-model|When Does LeJEPA Learn a World Model?]]: gives a complementary identifiability result for LeJEPA under Gaussian latent variables and isotropic Ornstein-Uhlenbeck transitions.
- [[papers/convergence-without-understanding-when-language-models-agree-on-representations-but-disagree-on-reasoning|Convergence Without Understanding]]: cautions that representational similarity across language models need not imply shared reasoning computations.

[[index|Library home]]
