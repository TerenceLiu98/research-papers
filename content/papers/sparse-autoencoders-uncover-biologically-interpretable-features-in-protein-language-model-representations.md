---
title: Sparse autoencoders uncover biologically interpretable features in protein language model representations
type: paper
authors:
  - Onkar Gujral
  - Mihir Bafna
  - Eric Alm
  - Bonnie Berger
year: 2025
tags:
  - protein-language-models
  - sparse-autoencoders
  - mechanistic-interpretability
---

## TL;DR

TopK sparse autoencoders recover biologically interpretable features from ESM2 protein and amino acid representations without annotation-supervised training. Gene Ontology enrichment and an LLM activation-simulation protocol support improved interpretability over original ESM2 neurons; protein-level transcoders perform comparably to SAEs.

## Research Question

Can unsupervised sparse decompositions expose biological functions and protein families encoded in dense protein language model representations, at both pooled protein and individual amino acid levels?

## Motivation

Mean-pooled protein embeddings support downstream tasks but conceal which biological attributes they encode. Supervised probes require specifying the attributes in advance. Sparse feature discovery offers a way to identify candidate attributes before assigning functional interpretations.

## Contributions

- Applies SAEs to both protein-level and amino acid-level ESM2 representations across layers 6–10.
- Adapts transcoders to approximate changes between consecutive protein-level representations.
- Evaluates biological coherence through GO enrichment and metadata-conditioned automated interpretation, comparing sparse features with original model neurons.

## Method

The backbone is the 12-layer, 35-million-parameter ESM2 model with 480-dimensional representations. The reported training dataset starts from 50 million UniRef50 sequences, excluding UniProt sequences and sequences longer than 1,024 residues, with an 80/20 training-validation split. Protein representations average token vectors after removing beginning and end tokens; amino acid SAEs train directly on token vectors.

Each SAE has 20,000 latent features, with TopK followed by ReLU and k=64 for protein representations or k=16 for amino acid representations. Training minimizes reconstruction error with an auxiliary reconstruction term addressing dead features. Transcoders use the same protein-level framework but predict the residual difference between consecutive layer representations, rather than reconstructing the input; they omit the SAE decoder's inverse normalization.

GO analysis uses 18,142 human UniProt proteins. Nonzero feature activations select protein sets for hypergeometric enrichment tests with Benjamini–Hochberg correction. Mean pairwise distances between enriched terms in the GO graph proxy functional coherence, while least-common-ancestor depth describes specificity.

For automated interpretation, 50,000 reviewed UniProt sequences supply metadata. Claude 3.5 Sonnet forms a one-sentence explanation from 8 active and 7 inactive examples, then predicts activations for 9 active and 8 inactive held-out examples. Pearson correlation with actual activations scores the explanation. Each configuration targets 200 sufficiently active features; original ESM neurons are thresholded at zero and normalized for comparison. Amino acid feature activations are averaged across the sequence before interpretation, so this evaluation remains at protein level.

## Experiments

Median activation-simulation Pearson correlations from Tables 2 and 5:

| ESM2 layer | Protein SAE | Protein transcoder | Protein ESM neuron | Amino acid SAE | Amino acid ESM neuron |
| --- | --- | --- | --- | --- | --- |
| 6 | 0.706 | 0.710 | 0.520 | 0.673 | 0.499 |
| 7 | 0.702 | 0.734 | 0.471 | 0.680 | 0.442 |
| 8 | 0.726 | 0.704 | 0.454 | 0.703 | 0.456 |
| 9 | 0.692 | 0.682 | 0.425 | 0.714 | 0.416 |
| 10 | 0.756 | 0.667 | 0.435 | 0.703 | 0.438 |

Sparse representations outperform the original neurons under this evaluation at every tested layer. Example interpretations concern NAD kinase, methyltransferase activity, peptidyl-tRNA hydrolases, and sensory perception. These are annotation-supported interpretations rather than experimentally established causal mechanisms.

Layer 9's protein SAE enriches 9,789 distinct GO terms, covering 52.17% of biological-process, 62.93% of molecular-function, and 59.83% of cellular-component terms present in the analysis protein set. Its transcoder enriches 9,659 terms, with 9,180 shared terms. Enriched terms are more proximal in the GO graph than randomly sampled terms at comparable hierarchy depths.

Coactivating proteins have greater sequence similarity, but correlations between similarity and interpretability are weak: for layer 9's amino acid SAE, global alignment, local alignment, and 3-mer similarity correlate with interpretability at 0.263, 0.117, and 0.188, respectively. Similarity alone therefore does not fully explain the reported scores.

## Limitations

The study examines one relatively small ESM2 backbone and a particular TopK design. Alternative pooling strategies, SAE architectures, and random-seed stability remain untested. Automated scores depend on metadata and prompts, and the 200 sufficiently active features per configuration are a selected subset of 20,000 features. Mean-pooling amino acid activations prevents residue-specific interpretations. Functional enrichment and activation prediction establish associations, not causal use of features or improved downstream function prediction; the authors explicitly distinguish their method from supervised function prediction.

## Related Concepts

- [[concepts/sparse-autoencoders|Sparse Autoencoders]] — sparse dictionary learning transfers from general model interpretability to biological representations, with annotation-based evaluation after unsupervised training.

## Related Papers

- Simon and Zou (2024), *InterPLM: Discovering interpretable features in protein language models via sparse autoencoders* (reference 25): contemporaneous amino acid-level SAE analysis with LLM-assisted interpretation.
- Adams et al. (2025), *From mechanistic interpretability to mechanistic biology: Training, evaluating, and interpreting sparse autoencoders on protein language models* (reference 26): contemporaneous amino acid-level SAE work.
- Dunefsky et al. (2024), *Transcoders find interpretable LLM feature circuits* (reference 14): motivates the transcoder variant, adapted here to pooled protein-layer residual differences.

Code reported by the paper: [Rep_SAEs_PLMs](https://github.com/onkarsg10/Rep_SAEs_PLMs).
