---
title: "From Nodes to Narratives: Explaining Graph Neural Networks with LLMs and Graph Context"
type: paper
authors:
  - Peyman Baghershahi
  - Gregoire Fournier
  - Pranav Nyati
  - Sourav Medya
year: null
source_job_id: "a5591b20-80bc-4ec1-922e-1fbbacd4b054"
tags:
  - graph-neural-networks
  - explainable-ai
  - large-language-models
  - text-attributed-graphs
  - soft-prompts
---

## TL;DR

LOGIC is a post-hoc local explainer for GNN node classifications on [[concepts/text-attributed-graphs|Text-Attributed Graphs]]. It trains a projector from GNN node representations into a frozen LLM's token-embedding space, interleaves the resulting soft prompts with instructions, and turns the LLM's node-level support judgments into a textual rationale and an explanation subgraph. Across four datasets, the reported fidelity-size trade-off is competitive but not uniformly best: LOGIC leads fidelity on CORA and produces especially small Amazon explanations, while GNNExplainer has higher fidelity on three datasets. A ten-case, one-expert evaluation favors LOGIC on seven of eight human-centered dimensions but not insightfulness. The method has no formal faithfulness guarantee and is vulnerable to interference and hallucination when multiple projected nodes share a prompt.

## Research Question

Can a frozen language model interpret a trained GNN's internal node representations well enough to produce understandable local rationales and concise, prediction-preserving subgraphs for node classification on text-attributed graphs?

## Motivation

Conventional GNN explainers identify influential nodes, edges, or features, but a subgraph or mask may not explain rich textual attributes in terms a domain user can understand. Existing LLM-assisted approaches can also inherit errors from a separate graph explainer or omit the GNN's internal representation. LOGIC instead uses the LLM itself as the interpreter while exposing both neighborhood context and projected latent features through [[concepts/llm-based-gnn-explanation|LLM-Based GNN Explanation]].

## Contributions

- Introduces a projector that maps each GNN node embedding to a sequence of soft tokens in a frozen LLM's embedding space.
- Trains the projector with a weighted combination of text-context alignment and pairwise similarity preservation from the GNN latent space.
- Constructs hybrid prompts from projected representations of the target and its GNN computation tree, eliciting node-wise summaries and support decisions.
- Converts those decisions into a local explanation subgraph and filters references to nodes outside the supplied neighborhood.
- Evaluates fidelity, explanation size, architecture and LLM variants, component ablations, and a small expert comparison with GNNExplainer.

## Method

### Projecting GNN Representations

For a trained GNN $\Phi$, node $v$ has a penultimate-layer embedding $f_\Phi(v)\in\mathbb{R}^m$. A learned projector $\Pi$ produces $k$ soft tokens of the LLM hidden width $h$:

$$
\Pi(f_\Phi(v))=Z_v\in\mathbb{R}^{k\times h}.
$$

The context loss aligns the mean projected representation with the frozen LLM embedding of the node's text. A contrastive loss makes distributions of pairwise cosine similarities among projected nodes approximate those among GNN embeddings. A coefficient $\beta$ balances the two objectives (Section 4.1).

### Hybrid Prompt and Subgraph

For a target node, the prompt interleaves ordinary instruction tokens with soft-token blocks for the target and nodes in its depth-$L$ computation tree, where $L$ is the number of GNN layers. The frozen LLM generates a rationale and labels listed neighbors as supporting, opposing, or unmentioned. LOGIC retains supporting nodes and samples a dataset-controlled number of neutral nodes to meet a target explanation-size proportion. References to nodes outside the supplied set are removed after generation (Sections 4.2-4.3).

The projector is the only trained bridge: the base GNN and LLM are not fine-tuned. This makes the framework post-hoc, but not training-free. The resulting rationale is an LLM interpretation of compressed GNN states rather than a direct trace of the GNN computation.

## Experiments

### Setup

The main experiments use three-layer GCN classifiers and frozen Llama-3.1-8B-Instruct on CORA, Wiki-CS, Amazon Products, and LIAR. The datasets respectively represent citation, Wikipedia-link, product co-purchase, and fake-news knowledge graphs. Splits are 60/20/20, and the baselines are the target node alone, random neighborhood subsets, GNNExplainer, PGExplainer, TAGExplainer, and an LLM prompted without projected embeddings (Section 5.2).

Fidelity is the fraction of explanation subgraphs on which the GNN retains its original prediction. Explanation size is the mean number of retained nodes. A complete neighborhood can be perfectly faithful but uninformative, so the two measures must be interpreted together.

### Main Results

LOGIC reports fidelity/size of 94.6%/17.4 on CORA, 89.0%/8.9 on Wiki-CS, 94.8%/10.3 on LIAR, and 87.0%/1.30 on Amazon. GNNExplainer obtains 92.0%/18.38, 95.4%/9.7, 100.0%/12.4, and 95.5%/5.63, respectively. LOGIC therefore improves fidelity and size on CORA and sharply reduces size on Amazon, but does not dominate fidelity across datasets. The target-only baseline is already highly faithful on LIAR (95.0%), limiting what fidelity there establishes (Table 1).

In the ablation, introducing projected embeddings reduces explanation size but often lowers fidelity relative to text-only LLM prompting. Post-processing recovers fidelity most clearly on Wiki-CS, with some size increase. The paper's Table 3 reports Amazon size 4.9 for the complete method, which conflicts with the 1.30 reported for the same main configuration in Table 1; this inconsistency is unresolved in the supplied text.

On ten CORA cases rated by one expert, LOGIC's mean scores exceed GNNExplainer's on understandability, trustworthiness, satisfaction, confidence, convincingness, communicability, and usability by 0.2-0.5 points on a five-point scale. Insightfulness is 0.2 points lower. This is exploratory evidence, not a population-level human-subject comparison (Sections 5.4 and Appendix G).

Additional Amazon tests show architecture sensitivity: LOGIC reaches 87.0% fidelity with GCN, 81.5% with GAT, and 60.0% with GIN, while explanation sizes remain 1.30-1.52. Across five LLM backbones, its reported fidelity ranges from 80.0% to 87.0% and its explanations remain smaller than those of the text-only LLM baseline (Appendix E).

## Limitations

- Multiple projected node blocks can interfere with one another, degrading generation and increasing hallucinations.
- Post-hoc filtering removes references to nonexistent nodes but does not establish that retained rationales faithfully reflect the GNN's causal decision process.
- The projector losses align textual context and representation geometry rather than optimizing explanation quality directly.
- The qualitative study uses one expert, ten CORA examples, and no reported inferential test or inter-rater assessment.
- Results depend on dataset-specific explanation-size controls, and the paper contains an unresolved Amazon size discrepancy between its main and ablation tables.
- Performance degrades on GAT and especially GIN in the reported Amazon extension, suggesting dependence on the GNN architecture and its use of structural information.

## Related Concepts

- [[concepts/llm-based-gnn-explanation|LLM-Based GNN Explanation]]
- [[concepts/text-attributed-graphs|Text-Attributed Graphs]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]
- Soft prompting
- Local factual explanations
- Explanation fidelity

## Related Papers

- Ying et al. (2019), "GNNExplainer: Generating Explanations for Graph Neural Networks."
- Luo et al. (2020), "Parameterized Explainer for Graph Neural Network."
- Pan et al. (2024), "TAGExplainer: Narrating Graph Explanations for Text-Attributed Graph Learning Models."
- Cedro and Martens (2025), "GraphXAIN: Narratives to Explain Graph Neural Networks."
- [[index|Library home]]
