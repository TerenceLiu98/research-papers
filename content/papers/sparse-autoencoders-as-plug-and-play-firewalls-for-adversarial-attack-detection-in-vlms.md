---
title: Sparse Autoencoders as Plug-and-Play Firewalls for Adversarial Attack Detection in VLMs
type: paper
authors:
  - Hao Wang
  - Yiqun Sun
  - Pengfei Wei
  - Lawrence B. Hsieh
  - Daisuke Kawahara
year: null
source_job_id: 5fa9b606-3bcc-44b8-913f-3e575be79092
repository: "https://github.com/conan1024hao/SAEgis"
tags:
  - sparse-autoencoders
  - vision-language-models
  - adversarial-detection
  - multimodal-safety
  - distribution-shift
---

## TL;DR

SAEgis detects adversarially perturbed images by inserting [[concepts/sparse-autoencoders|Sparse Autoencoders]] into a frozen vision-language model, ranking sparse features by their activation difference between clean and attacked images, and thresholding how often the selected features activate. On Qwen2.5-VL-3B-Instruct, its three-layer ensemble reports average F1 scores of 97.3% in-domain and 94.4% cross-domain. Cross-attack performance remains strong for the ensemble, but single projection-layer detectors can lose substantial recall, and distribution shift can invalidate thresholds calibrated only on clean development data.

[[index|Library home]]

## Research Question

Can sparse features learned with an ordinary reconstruction objective provide a lightweight detector for adversarial images that generalizes across datasets and attack methods without adversarially training a classifier?

## Motivation

Image perturbations create an attack surface that does not exist in text-only models, while prior VLM detectors are often evaluated on fixed datasets or older attacks. The paper asks whether a plug-in representation learned from model activations can expose attack signals that transfer beyond the data and attack used to select them. This shifts the focus from reconstructing inputs or training a separate detector toward measuring sparse internal activation patterns.

## Contributions

- Introduces SAEgis, which uses reconstruction-trained SAE latents as features for adversarial-image detection in a pretrained VLM.
- Defines an attack-relevance score combining a feature's peak activation and its spatial extent over image tokens, then selects features by the difference between attack and clean means.
- Calibrates the decision threshold using only held-out clean examples at a specified false-positive target.
- Combines detectors from early and intermediate vision blocks and the visual projection layer to capture complementary low-level and global signals.
- Evaluates in-domain, cross-domain, and cross-attack transfer against SSA-CWA, M-Attack, and FOA-Attack on natural and medical-image datasets.

## Method

An SAE is trained to reconstruct activations at a chosen Qwen2.5-VL layer. For feature $i$ and image $x$, SAEgis scores activation over image tokens $T$ as

$$
\operatorname{score}_i(x)=\max_{t\in T}a_{i,t}(x)\,
\log\left(1+\left|\{t\in T:a_{i,t}(x)>0\}\right|\right).
$$

The attack score is the adversarial-set mean minus the clean-set mean of this quantity. SAEgis ranks all latents by that difference and retains the top $K$. For a new image, it averages the number of active selected features across image tokens,

$$
N(x)=\frac{1}{|T|}\sum_{t\in T}\sum_{i=1}^{K}\mathbf{1}[a_{i,t}(x)>0].
$$

The threshold is the $(1-\alpha)$ quantile of $N(x)$ on a held-out clean development set; the experiments set $\alpha=0.02$. A sample is flagged when its statistic exceeds this threshold. The multi-layer version averages independently computed statistics from vision-block0, vision-block10, and projection-mlp2 before applying the same clean-only calibration.

The backbone is Qwen2.5-VL-3B-Instruct. Nine candidate SAE locations are trained on 500,000 FineVision samples with latent dimension 32,768 and TopK sparsity 64. Preliminary transfer experiments select three layers for the ensemble and $K=256$ attack-relevant features for subsequent evaluations.

## Experiments

The evaluation uses NIPS17, LLaVA-Instruct-150K, and a medical multimodal dataset. Each dataset contributes 800 clean images for feature extraction, 100 clean development images for calibration, and 100 clean test images, plus 100 adversarial images each for feature selection and testing. Test sets balance clean and adversarial samples. Baselines include a nearest-reference dense hidden-state detector, its layer ensemble, and PIP.

| Setting | Method | Precision | Recall | F1 |
| --- | --- | ---: | ---: | ---: |
| In-domain average | SAEgis | 98.1 | 89.9 | 93.7 |
| In-domain average | SAEgis ensemble | 97.7 | 97.0 | 97.3 |
| Cross-domain average | SAEgis | 93.3 | 85.3 | 88.4 |
| Cross-domain average | SAEgis ensemble | 93.1 | 96.2 | 94.4 |
| Cross-domain average | Dense ensemble | 71.4 | 99.9 | 82.2 |
| Cross-domain average | PIP | 96.8 | 70.4 | 79.4 |

In cross-attack tests, early vision features transfer better than projection-layer features. For SSA-CWA to M-Attack on Medical, vision-block0 reaches 89.7% F1 while projection-mlp2 reaches 45.8%; the three-layer ensemble reaches 93.7%. Across the two reported target attacks, the ensemble's aggregate change from its no-transfer performance is small ($+1.3$ precision, $-1.0$ recall, and $+0.1$ F1), whereas the single-layer SAEgis summary reports a $-36.3$ F1 change.

The feature-overlap analysis finds substantial sharing across all three datasets, including the medical domain. Across attacks, overlap between SSA-CWA and the newer attacks decreases in deeper layers, while M-Attack and FOA-Attack remain similar. An ablation reports roughly 80% cross-domain F1 with only 10 adversarial feature-selection examples alongside 800 clean images.

## Limitations

- The detector still uses labeled adversarial examples to identify attack-relevant features, even though it does not optimize an adversarial classifier or use attacked examples to calibrate the threshold.
- Clean-only quantile calibration is sensitive to distribution shift. Shifted clean activations can reduce precision, shifted attack activations can reduce recall, and overlapping clean and attack distributions can defeat thresholding altogether.
- The strongest transfer behavior depends on layer choice. Projection-layer features alone generalize poorly across some attacks, and the reported robustness relies on a three-layer ensemble.
- All main experiments use one VLM backbone, three image datasets, three attack families, and the fixed prompt "Describe this image." The evidence does not establish transfer to other architectures, tasks, prompts, or attack types.
- The claimed false-positive control is empirical on the clean development distribution; it is not a guarantee under deployment shift.
- Reconstruction error itself showed negligible separation between clean and adversarial inputs, so the result depends on selected latent activation patterns rather than generic SAE anomaly scores.
- The manuscript states that SAE weights will be released upon publication; their availability is therefore not established by the supplied text.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]: provide the latent feature basis used for detection.
- [[concepts/early-fusion-vision-language-models|Early-Fusion Vision-Language Models]]: broader architectural context for multimodal representation processing.
- [[concepts/distributional-extrapolation|Distributional Extrapolation]]: relates to the detector's cross-domain evaluation and calibration failures under shifted distributions.

## Related Papers

- Zhang et al. (2024), "PIP: Detecting Adversarial Examples in Large Vision-Language Models via Attention Patterns of Irrelevant Probe Questions": attention-map SVM baseline evaluated by the paper.
- Huang et al. (2024), "Effective and Efficient Adversarial Detection for Vision-Language Models via a Single Vector": motivates the dense hidden-state reference-direction baseline.
- Jiang et al. (2025), "HiddenDetect: Detecting Jailbreak Attacks Against Large Vision-Language Models via Monitoring Hidden States": related hidden-state detection approach.
- Fares et al. (2024), "MirrorCheck: Efficient Adversarial Defense for Vision-Language Models": detects attacks through caption-conditioned image reconstruction and embedding comparison.
- [[papers/layer-wise-perturbations-via-sparse-autoencoders-for-adversarial-text-generation|Layer-Wise Perturbations via Sparse Autoencoders for Adversarial Text Generation]]: uses SAE features as an adversarial intervention surface rather than as a detector.
