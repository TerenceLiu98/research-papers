---
title: Language Models Suffer from a Curse of Ambiguity
type: paper
authors:
  - Nicolas Zucchet
  - Hyun Dong Lee
  - Scott Linderman
year: null
source_job_id: "b6ba1a85-248f-473d-a4f7-49534d4598af"
tags:
  - language-models
  - uncertainty
  - neural-network-capacity
  - optimization
  - softmax
---

## TL;DR

The paper argues that discrete predictive distributions become harder for neural networks to learn as their probability mass spreads across more plausible outputs. In linear-softmax theory, greater ambiguity reduces associative storage capacity, raises the embedding dimension needed for representation, slows early optimization, and increases the loss induced by sampled labels. Controlled 3-gram experiments reproduce these signatures, while comparisons between OLMo-2 models on natural text show a positive association between ambiguity and model disagreement at fixed estimated context frequency. The natural-language evidence relies on imperfect model- and embedding-based proxies and is partly complicated by in-context copying.

## Research Question

How does the ambiguity of a context's next-token distribution affect a neural network's ability to represent, store, and learn that distribution accurately?

## Motivation

Modern language-model uses increasingly depend on the full predictive distribution rather than only its mode. Inference-time sampling, on-policy reinforcement learning, and training on model-generated data all require probability mass over multiple plausible continuations. Systematic under-modeling of ambiguous distributions can therefore reduce exploration and diversity and may compound across generations of synthetic data.

## Contributions

- Formalizes the [[concepts/curse-of-ambiguity|Curse of Ambiguity]] using support size for uniform targets and effective support size, $\exp(H(p))$, for nonuniform targets.
- Derives an associative-memory capacity scaling proportional to $hd/k$ for a linear head with embedding dimension $h$, vocabulary size $d$, and support size $k$, up to logarithmic factors in the formal bounds.
- Connects exact representation of every size-$k$ support to neighborly polytopes, obtaining an ideal-backbone threshold $h\geq 2k$ and a robust construction with an additional logarithmic factor.
- Shows that ambiguity slows early gradient-flow optimization and raises finite-time loss, while sampled next-token labels introduce a $k$-dependent noise floor.
- Tests the predicted signatures in a controlled Transformer 3-gram task and reports corresponding patterns in pretrained OLMo-2 models on natural text.

## Method

### Context Classification Model

The analysis treats next-token prediction as multiclass logistic regression. A backbone maps context $i$ to an embedding $e_i\in\mathbb R^h$, and a linear-softmax head predicts $\hat p_i=\operatorname{softmax}(We_i)$ over a vocabulary of size $d$. The theoretical target is uniform on a randomly chosen support $S_i$ of size $k$; for general distributions, ambiguity is measured by effective support size $\exp(H(p_i))$.

### Architectural Analysis

For random unit-sphere embeddings, the paper studies a Hebbian construction

$$
W=\beta\sum_{i=1}^n z_i e_i^\top,
$$

where $z_i$ separates supported from unsupported outputs. Cross-context interference has approximate per-coordinate variance $nk/(hd)$ when $k\ll d$, yielding the capacity heuristic

$$
\text{capacity}\propto \frac{hd}{k}.
$$

Formal lower and upper bounds recover this dependence up to logarithmic factors. A separate geometric argument asks whether jointly chosen embeddings and head weights can realize every size-$k$ support. It reduces the question to $k$-neighborliness of a polytope and gives the idealized threshold $h\geq 2k$; robustness to imperfect embeddings costs an additional $\log(d/k)$ factor.

### Learning Analysis

Below the capacity threshold, contexts decouple. For one uniform size-$k$ target, gradient flow reduces to the gap $\Delta\ell$ between on- and off-support logits. Early loss decreases approximately as

$$
D_{\mathrm{KL}}(t)\approx \log(d/k)-t/k,
$$

whereas late loss behaves as $k(d-k)/(td)$. Modeling one sampled label per context update as a stochastic perturbation introduces variance among on-support logits. The paper's second-order analysis predicts an excess-loss floor of $(k-1)/(4k)$ relative to expected-loss gradient flow under its continuous-time approximation.

## Experiments

### Controlled 3-Gram Task

The authors construct word-level 3-gram distributions from TinyStories, sample 100 million training tokens, and by default train a four-layer Transformer with roughly 4 million parameters. Contexts are grouped by observed frequency and effective support size. At fixed frequency, KL divergence rises with ambiguity; models increasingly leak probability outside the true support and consequently predict higher-entropy distributions.

Ablations vary model width, output embedding dimension, training duration, and sampled cross-entropy versus the full expected KL objective. More capacity and training shift an iso-loss contour broadly across ambiguity levels. Larger embeddings and removal of label-sampling noise preferentially improve high-ambiguity contexts, matching the qualitative theoretical predictions.

### Natural-Text Models

OLMo-2 13B serves as a proxy target distribution and OLMo-2 1B as the evaluated model on 100,000 Dolma v1.7 sequences of length 512. The reference model's entropy defines effective support size. Because exact long contexts rarely repeat, the paper estimates semantic context frequency by reducing 13B last-layer embeddings from 5,120 to 512 dimensions and applying a 2,000-neighbor exponential-kernel density estimate.

At fixed estimated frequency, greater effective support is associated with higher KL divergence from the 13B proxy. The reported squared Pearson correlation between log loss and log ambiguity reaches 0.37 for effective support and 0.68 for thresholded raw support in frequency-conditioned analyses. A 7B probe agrees more closely with the 13B reference than the 1B probe, especially for frequent, low-ambiguity contexts.

Validation on the synthetic task gives Pearson correlation 0.86 and Spearman correlation 0.92 between log true frequency and the density proxy when positions are weighted by their occurrence. Across distinct contexts, however, these correlations fall to 0.30 and 0.24, showing that the proxy is noisy in the rare tail.

## Limitations

- The sharp theoretical results concern a linear-softmax head, mostly with random embeddings and uniform-on-support targets. Their extension to learned Transformer representations is supported empirically rather than proved.
- OLMo-2 13B is not the ground-truth distribution of natural language. KL divergence to that model measures agreement with a larger proxy, and its entropy supplies the ambiguity measure being tested.
- Semantic context frequency is an embedding-density proxy with bandwidth, dimension-reduction, and neighbor-count choices. Its synthetic validation is strong when weighting repeated positions but weak over distinct rare contexts.
- Natural data contain reusable structure excluded from the basic analysis. Among the low-frequency, low-loss band, 61% of predictions are explained by an in-context bigram completion and 33% by a trigram completion, compared with 11.2% and 3.4% elsewhere. [[concepts/in-context-learning|In-Context Learning]] can therefore bypass frequency-based memorization.
- The paper reports qualitative agreement between controlled ablations and theory, but the natural-language study is observational and does not isolate each proposed root cause.
- The supplied Markdown gives no publication year, venue, DOI, or arXiv identifier; none is inferred here.

## Related Concepts

- [[concepts/curse-of-ambiguity|Curse of Ambiguity]]: the paper's central relation between output uncertainty and learning difficulty.
- [[concepts/in-context-learning|In-Context Learning]]: repeated local patterns explain an important exception to the frequency-ambiguity trend.
- [[concepts/capacity-per-label|Capacity Per Label]]: another output-sensitive view of neural-network capacity, developed with a different operational definition.
- Neural associative memory: the storage analysis interprets a linear language-model head as an associative memory.

## Related Papers

- Chang and McCallum (2022), "Softmax Bottleneck Makes Language Models Unable to Represent Multi-mode Word Distributions": cited precedent connecting output ambiguity to representational limits.
- Nichani et al. (2025), "Understanding Factual Recall in Transformers via Associative Memories": cited foundation for the Hebbian capacity construction.
- Allen-Zhu and Li (2025), "Physics of Language Models: Part 3.3, Knowledge Capacity Scaling Laws": cited context for total parameter count as a capacity measure.
- Olsson et al. (2022), "In-context learning and induction heads": relevant to the copying mechanism proposed for low-frequency, low-loss contexts.

[[index|Library home]]
