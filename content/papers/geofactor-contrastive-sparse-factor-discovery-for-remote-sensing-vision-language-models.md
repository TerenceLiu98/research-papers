---
title: "GeoFactor: Contrastive Sparse Factor Discovery for Remote-Sensing Vision-Language Models"
type: paper
authors:
  - Anonymous
year: null
source_job_id: "c681f0ec-dcb2-4f28-bf58-a79a015f9d78"
tags:
  - remote-sensing
  - vision-language-models
  - sparse-autoencoders
  - interpretable-retrieval
  - representation-steering
---

## TL;DR

GeoFactor trains a shared top-k [[concepts/sparse-autoencoders|Sparse Autoencoder]] over frozen image and text embeddings from remote-sensing vision-language models, combining reconstruction with latent contrastive alignment. On 48,715 RSICD and RSITMD image-caption pairs, its factors support semantic naming, metadata-controlled validation, and retrieval interventions; however, several factors remain entangled with dataset context, and concept alignment does not always imply a positive causal effect on retrieval.

## Research Question

Can a frozen remote-sensing vision-language model's dense image and text embeddings be decomposed into shared, human-readable sparse factors that preserve retrieval structure and provide effective coordinates for post-hoc retrieval intervention?

## Motivation

Remote-sensing retrieval depends on combinations of land cover, texture, and spatial organization, such as harbor infrastructure beside water or repetitive cropland parcels. Dense VLM embeddings can retrieve these scenes without revealing which signals determine the ranking. An explanation layer therefore needs to align image and caption evidence, distinguish semantics from dataset metadata, and support interventions that test whether a named factor actually affects retrieval.

## Contributions

- Introduces GeoFactor, a shared sparse factorization of paired image and text embeddings with reconstruction, top-k sparsity, and symmetric latent contrastive losses.
- Evaluates factors with semantic average precision, metadata-matched controls, ablation, boosting, human naming, stability matching, and patch-level masking.
- Demonstrates editable factors for airports, harbors, water, cropland, forests, roads, and urban layouts across GeoRSCLIP and RemoteCLIP.
- Separates factor readability from retrieval influence by comparing GeoFactor with reconstruction-only, concept-bank, concept-dictionary, and patch-token baselines.

## Method

Frozen GeoRSCLIP or RemoteCLIP encoders produce normalized image and caption embeddings. One shared encoder applies a linear map, ReLU, and TopK operator; a shared linear decoder reconstructs both modalities. Training minimizes image-and-text reconstruction error, an L1 penalty on selected activation magnitudes, and a symmetric contrastive loss over the cosine similarities of paired sparse codes. The main configuration uses 1,024 factors with eight active coordinates, trained for 12 epochs.

Each coordinate is inspected through its highest-activation images, captions, and phrases. Factor ablation sets one coordinate to zero, while boosting adds a positive value to it; retrieval is then recomputed in sparse space or after decoding. The same coordinate thus serves as a candidate semantic label, a ranking signal, and an intervention target. Metadata-matched AP compares semantic positives with controls balanced within dataset, split, image-size, and area strata.

## Experiments

The main dataset contains 25,000 RSICD and 23,715 RSITMD image-caption pairs. GeoFactor is tested on frozen ViT-B/32 GeoRSCLIP and RemoteCLIP backbones and compared with a reconstruction-only VL-SAE, a 35-term SpLiCE-style concept dictionary, label-free and discover-then-name concept bottlenecks, and PatchSAE.

**Sparse retrieval alignment.** GeoFactor obtains latent image-to-text R@10 of 0.0450 on GeoRSCLIP and 0.1230 on RemoteCLIP, versus 0.0032 and 0.0143 for VL-SAE. The reconstruction-only model has almost identical paired supports but poor discrimination, while the three-seed ablation reports that the contrastive objective outperforms vanilla, top-k-only, and positive-pair-only variants.

**Semantic validity and interventions.** Airport and harbor coordinates have the strongest semantic and metadata-matched AP. Mean concept-specific ablation effects are 0.009 R@10 for GeoRSCLIP and 0.016 for RemoteCLIP, the largest among the compared methods. Individual effects are heterogeneous: RemoteCLIP harbor drops by 0.050 and airport by 0.025, whereas several road, urban, and forest ablations are near zero or negative. Boosting the GeoRSCLIP water coordinate raises water-caption top-10 hit rate by 0.087 (95% bootstrap interval [0.080, 0.094]); its airport coordinate raises the corresponding rate by 0.035 [0.028, 0.043].

**Metadata, naming, and stability.** Matching on metadata preserves strong AP for airport, harbor, water, cropland, and most forest factors, but road and urban factors show greater semantic-source entanglement. Removing all identified source factors from an RSICD-trained model reduces held-out RSITMD image-to-text R@10 from 0.0307 to 0.0237. Blind annotators assign full or partial matches to 93.3% of sampled GeoRSCLIP factors and 78.3% of RemoteCLIP factors; majority agreement is 85.0% and 76.7%. Across training perturbations, matched factors have decoder cosines of 0.825 and 0.727 and support Jaccards of 0.428 and 0.393.

## Limitations

- The manuscript is an anonymous submission and supplies no venue, year, DOI, arXiv identifier, or public implementation.
- Evidence comes from two CLIP-style backbones and two caption datasets; it does not establish transfer to other remote-sensing modalities, model families, or operational settings.
- Factors can encode semantics and dataset source in the same coordinate. Metadata matching diagnoses observed strata but cannot rule out unmeasured confounding.
- Semantic ranking is not equivalent to causal usefulness: some named factors have negligible or negative ablation effects, and the average intervention gains are small in absolute R@10 terms.
- Patch localization is reported only for selected GeoRSCLIP airport and cropland factors, while human naming covers 20 factors per backbone rather than the full dictionary.
- A shared encoder assumes that corresponding image and text evidence can use one coordinate; the study does not compare against post-hoc alignment of modality-specific dictionaries.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/multimodal-embedding-models|Multimodal Embedding Models]]
- [[concepts/remote-sensing-foundation-models|Remote-Sensing Foundation Models]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/cross-modal-feature-heterogeneity|Cross-Modal Feature Heterogeneity]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]

## Related Papers

- [[papers/same-concept-different-directions-cross-modal-feature-heterogeneity-in-sparse-autoencoders|Same Concept, Different Directions: Cross-Modal Feature Heterogeneity in Sparse Autoencoders]] questions the shared-direction assumption and aligns modality-specific sparse dictionaries after training.
- [[papers/learning-retrieval-models-with-sparse-autoencoders|Learning Retrieval Models with Sparse Autoencoders]] trains retrieval through a pretrained language-model SAE rather than decomposing a frozen multimodal retriever post hoc.
- [[papers/causal-interpretation-of-sparse-autoencoder-features-in-vision|Causal Interpretation of Sparse Autoencoder Features in Vision]] separates a vision SAE feature's activation location from the input patches that causally drive it.
- [[papers/galileo-learning-global-and-local-features-of-many-remote-sensing-modalities|Galileo: Learning Global & Local Features of Many Remote Sensing Modalities]] learns general-purpose remote-sensing representations across heterogeneous Earth-observation inputs rather than interpreting a frozen image-text retrieval space.

[[index|Library home]]
