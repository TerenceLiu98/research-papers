---
title: "Explaining Graph Neural Networks for Node Similarity on Graphs"
type: paper
authors:
  - Daniel Daza
  - Cuong Xuan Chu
  - Trung-Kien Tran
  - Daria Stepanova
  - Michael Cochez
  - Paul Groth
year: null
openreview: zDEwl4zidP
source_job_id: "9ca15dd3-fbab-4c98-828c-8ceb44812549"
tags:
  - graph-neural-networks
  - explainable-ai
  - node-similarity
  - gradient-attribution
  - graph-representation-learning
---

## TL;DR

This paper frames explanation of continuous similarity scores between GNN node embeddings as a distinct problem from explaining class labels. It evaluates edge attributions by intervening on the graph and asking whether selected edges change similarity predictably, whether opposite attribution groups have distinct effects, and whether those effects survive pruning. Across the tested embedding methods, graphs, and mostly GCN-based experiments, direct gradients and Integrated Gradients are generally more actionable and consistent than GNNExplainer's mutual-information mask; Integrated Gradients retains these properties after up to 90% of selected edges are removed in the reported sparsity study.

## Research Question

What properties should an explanation of a GNN-derived node-similarity score have, how can those properties be measured without ground-truth explanations, and how well do mutual-information and gradient-based explainers satisfy them?

## Motivation

Similarity search often ranks graph nodes by cosine similarity between embeddings learned without labels. Most GNN explainers and evaluation protocols instead target supervised, discrete predictions such as node classes or links. A relevance mask can identify edges associated with a prediction without saying whether retaining those edges will raise or lower a continuous similarity score. The paper therefore evaluates explanations through controlled graph interventions rather than supervised correctness.

## Contributions

- Formulates edge-level explanation of pairwise node similarity as an instance-level GNN explanation problem.
- Defines actionability, consistency, and sparsity as desirable properties of similarity explanations.
- Introduces fidelity changes and effect overlap as model-agnostic, intervention-based metrics for these properties.
- Compares GNNExplainer with raw gradients and Integrated Gradients across four unsupervised embedding objectives, seven graphs, and several GNN architectures.
- Shows that the metrics reveal failure modes hidden by fidelity alone, especially when both sides of an attribution threshold have similar effects or when low overlap accompanies negligible effects.

## Method

A trained GNN maps node features and adjacency matrix $(X,A)$ to embeddings $Z$. For nodes $i$ and $j$, the target is their cosine similarity $y(i,j)$. An explainer assigns every relevant edge a value in a matrix $M$. GNNExplainer produces a mask in $[0,1]$ and is split at 0.5; gradient explainers produce signed values and are split at zero.

The two thresholded masks retain edges above and below the threshold separately. Running the GNN on each intervened adjacency matrix produces similarities $y_a$ and $y_b$. Actionability is measured by

$$
\operatorname{Fid}_a=y_a-y, \qquad \operatorname{Fid}_b=y_b-y.
$$

Predictable signs indicate that an attribution group has a controllable effect. Consistency is measured by effect overlap (EO), a generalized Jaccard similarity between the positive/negative sign counts for the two fidelity distributions. EO is zero when the two interventions always act in opposite directions and one when their sign behavior is indistinguishable. Fidelity magnitude and EO must be read jointly because a near-zero intervention can obtain low overlap without being useful.

For sparsity, increasingly large fractions of the least influential retained edges are removed and fidelity and EO are recomputed. This operationalizes whether an explanation is compressible without losing its intervention behavior. The resulting framework is summarized in [[concepts/intervention-based-evaluation-of-gnn-similarity-explanations|Intervention-Based Evaluation of GNN Similarity Explanations]].

## Experiments

The study trains two-layer GCNs with Graph Autoencoders, Variational Graph Autoencoders, Deep Graph Infomax, and GRACE. It evaluates Cora, Citeseer, Pubmed, Chameleon, Actor, Squirrel, and DBpedia50k, comparing GNNExplainer (MI), direct input gradients (GB1), and Integrated Gradients (GB2). Appendix experiments replace the GCN with SGC, GraphSAGE, MixHop, and, on DBpedia50k, R-GCN.

In the main GCN experiments, gradient explanations consistently assign positive and negative edge groups that respectively increase and decrease similarity. Their EO is around 0.1 or below in most cases, while GNNExplainer often reaches 0.4 or above 0.5 and its intervention direction varies by dataset and embedding objective. DGI on heterophilic graphs is a notable weaker case, with higher overlap.

The architecture extensions broadly preserve the main pattern but expose an important exception: with DGI and GraphSAGE, interventions tend to decrease similarity regardless of attribution sign. Gradient methods still produce larger changes, while MI sometimes has lower EO only because its effects are near zero. This demonstrates why EO is not meaningful in isolation.

The sparsity experiment uses Integrated Gradients with GAE embeddings and removes edges in 10% increments. Across the six citation, Wikipedia, and actor graphs, fidelity direction and EO remain nearly constant through 90% pruning. A DBpedia50k case study for the plant genera *Lilium* and *Dendrobium* also places high positive gradient attribution on their shared Plant and Flowering Plant relations, whereas GNNExplainer emphasizes edges outside their one-hop neighborhoods.

## Limitations

- The empirical comparison covers one mutual-information explainer and two gradient variants; the paper proposes but does not test PGExplainer, SubgraphX, PGM-Explainer, or explainers designed specifically for similarity.
- The sparsity result is restricted to Integrated Gradients with GAE embeddings and does not establish the same 90% reduction for other objectives, architectures, or DBpedia50k.
- Edge masking can create graph inputs outside the embedding model's training distribution. Measured score changes establish model behavior under those interventions, not that the retained subgraph is a human-valid causal explanation.
- There are no ground-truth explanations or user studies. The DBpedia example is illustrative rather than a systematic semantic evaluation.
- The study focuses empirically on cosine similarity. The metrics can be applied to other similarity functions, but comparable behavior for Euclidean distance or other measures is proposed rather than demonstrated.
- Computational cost is discussed analytically as one backward pass for gradients versus iterative optimization for GNNExplainer, but runtime and memory are not benchmarked.
- No explicit publication year is present in the supplied Markdown, so the metadata leaves it unset.

## Related Concepts

- [[concepts/intervention-based-evaluation-of-gnn-similarity-explanations|Intervention-Based Evaluation of GNN Similarity Explanations]]
- [[concepts/neural-message-passing|Neural Message Passing]]
- [[concepts/llm-based-gnn-explanation|LLM-Based GNN Explanation]]
- [[concepts/oversmoothing-in-graph-neural-networks|Oversmoothing in Graph Neural Networks]]

## Related Papers

- Ying et al. (2019), "GNNExplainer: Generating Explanations for Graph Neural Networks," supplies the mutual-information explainer used as the MI baseline.
- Sundararajan, Taly, and Yan (2017), "Axiomatic Attribution for Deep Networks," introduces Integrated Gradients, used as GB2.
- Xie et al. (2022), "Task-Agnostic Graph Explanations," explains embedding dimensions for transfer to downstream tasks rather than pairwise similarity scores.
- Piaggesi, Panisson, and Khosla (2025), "Disentangled and Self-Explainable Node Representation Learning," evaluates semantic structure in embedding spaces using graph annotations; this paper instead evaluates explanations of individual similarity computations.
- [[papers/from-nodes-to-narratives-explaining-graph-neural-networks-with-llms-and-graph-context|From Nodes to Narratives: Explaining Graph Neural Networks with LLMs and Graph Context]] explains supervised node classifications with textual rationales and retained subgraphs.

[[index|Library home]]
