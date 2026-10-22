---
title: "Causally Reliable Concept Bottleneck Models"
type: paper
authors:
  - Giovanni De Felice
  - Silvia Santini
  - Arianna Casanova Flores
  - Johannes Schneider
  - Francesco De Santis
  - Pietro Barbiero
  - Alberto Termine
year: 2025
tags:
  - concept-bottleneck-models
  - causal-machine-learning
  - causal-discovery
  - interpretable-machine-learning
  - concept-interventions
  - algorithmic-fairness
---

## TL;DR

This paper introduces [[concepts/causal-concept-bottlenecks|Causal Concept Bottlenecks]] (C²BMs), which replace the flat concept-to-task structure of standard [[concepts/concept-bottleneck-models|Concept Bottleneck Models]] with a directed acyclic graph over interpretable variables. A neural encoder supplies variable-specific exogenous embeddings, while hypernetworks adapt the coefficients of linear structural equations for each input. Across synthetic Bayesian networks and image benchmarks, C²BM reports task accuracy comparable to strong opaque and concept-based baselines, causal graphs closer to known ground truth, stronger propagation of concept corrections, and the ability to block a constructed unfair pathway.

## Research Question

Can a concept-based neural model make its internal information flow agree more closely with a domain's causal structure, while preserving predictive accuracy and supporting interventions on intermediate concepts?

## Motivation

Standard concept bottlenecks expose named intermediate variables, but usually treat every concept as an independent direct cause of the task. This flat graph can turn an interpretable association into a misleading causal explanation and prevents a correction to one concept from propagating selectively to its descendants. The paper seeks a model whose transparent computation follows an explicit causal graph rather than only correlations learned from the training distribution.

## Contributions

- Defines C²BM, an architecture that organizes interpretable endogenous variables in a causal DAG and predicts each variable from its parents and an input-derived exogenous representation.
- Uses input-conditioned hypernetworks to parameterize simple linear structural equations, exposing edge weights while retaining nonlinear predictive capacity.
- Proposes an automated instantiation pipeline: generate and label concepts, estimate a CPDAG from observational data with Greedy Equivalence Search, then use an LLM with retrieval-augmented context to orient or remove unresolved edges.
- Evaluates predictive accuracy, graph recovery, concept interventions, a color-parity distribution shift, and pathway blocking in a constructed CelebA hiring scenario.
- Provides a universal-approximation argument for the predictive architecture, independent of the supplied causal graph. This concerns function approximation, not recovery of the true graph or structural equations.

## Method

For input $X$, an encoder produces one exogenous embedding $U_i=g(X)_i$ for every endogenous concept or task variable $V_i$. A supplied DAG determines each parent set $\mathrm{PA}_i$. The model predicts non-root variables using an adaptive linear structural equation

$$
V_i=\sum_{V_j\in\mathrm{PA}_i}[\theta_{f_i}]_jV_j,
\qquad
\theta_{f_i}=r_i(U_i),
$$

where a separate hypernetwork $r_i$ produces the edge coefficients for the current input. Root variables are predicted directly from their exogenous embeddings. Training maximizes the conditional likelihood of all endogenous variables in topological order. At inference, the graph is restricted to ancestors of the selected task; an intervention fixes a concept value, removes its dependence on its parents, and propagates the result only through descendants.

When concepts and a graph are not supplied, the proposed pipeline first asks an LLM for task-relevant concepts, filters them, and uses a contrastive vision-language model to generate labels. GES then estimates a Markov equivalence class from the concept data. For each unoriented edge, an LLM chooses a direction or no causal relation using retrieved web, arXiv, or local-document context; the query is repeated ten times and decided by the most frequent response. The architecture itself is agnostic to how concepts and the graph are obtained.

The authors explicitly do not claim to identify the true structural functions. The adaptive equations approximate variable outcomes under the chosen graph so that the model can answer forward and interventional queries.

## Experiments

**Setup.** The evaluation uses five sampled Bayesian networks with known graphs (Asia, Sachs, Insurance, Alarm, and Hailfinder), colored MNIST, CelebA, a causally extended CUB subset, and SIIM Pneumothorax. Baselines are an opaque neural predictor, linear and nonlinear CBMs, Concept Embedding Models (CEM), and Stochastic CBMs (SCBM). Main accuracy results average five runs and report two standard errors of the sample mean.

**Predictive accuracy.** C²BM remains close to the opaque and concept-based baselines across the reported tasks. For example, its task accuracy is 71.4% on Asia, 65.33% on Sachs, 74.1% on Hailfinder, 94.18% on cMNIST, and 80.5% on Pneumothorax. It is not uniformly best: SCBM reaches 66.30% on Sachs and 73.4% on Hailfinder, while the opaque model reaches 60.3% on the causally extended CUB task compared with 58.1% for C²BM.

**Graph recovery.** Relative to the flat graph implicit in a standard CBM, GES followed by LLM refinement substantially reduces disagreement with known graphs. On Sachs, the custom structural Hamming distance falls from 11.75 for the flat graph to 3.4 after causal discovery and 1.8 after LLM refinement; incorrect edges fall from 23 to 17 and then 7. On Alarm, the respective Hamming values are 45.0, 5.4, and 5.0. The LLM refinement is not uniformly helpful: Hailfinder remains at 11.0 after refinement.

**Interventions and bias.** Ground-truth concept corrections improve predictions of downstream variables with fewer interventions than the compared concept models. In biased cMNIST, all encoders learn the training correlation and fail under the reversed color-parity shift before intervention; after intervening on digit identity, C²BM reaches roughly 90% parity accuracy because its refined graph excludes the color-parity edge. This is evidence about intervention behavior in the constructed setting, not general OOD robustness.

**Fairness demonstration.** In a constructed CelebA hiring graph, the paper measures the causal concept effect of `Attractive` on `Should be Hired`. Intervening on the mediating `Qualified` node reduces this effect from $25.1\%\pm1.8$ to $0.0\%\pm0.0$ for C²BM. The compared CBM, CEM, and SCBM architectures retain nonzero effects because their direct concept-to-task connections bypass the mediator.

**Ablations.** GES plus LLM/RAG generally performs best among the tested discovery pipelines, but direct LLM graph construction is expensive and times out beyond 24 hours on larger datasets. RAG improves the Sachs graph in the reported comparison but makes no difference on Alarm. Graph recovery improves as sample size grows. Predictive task accuracy remains fairly stable under substantial edge corruption and progressive flattening, consistent with the architecture's flexible input-conditioned parameterization but also showing that task accuracy alone does not validate the graph.

## Limitations

C²BM depends on a suitable concept vocabulary, labels for all modeled variables, and a causal graph whose quality rests on observational assumptions and background knowledge. The automated route additionally requires pretrained language and vision-language models, reliable source material, and carefully designed prompts. Bias or omissions in data, retrieval, or the knowledge base can produce an incorrect graph, and current causal structure learning limits scalability.

The model does not identify the true structural equations, and its universal-approximation result does not establish causal identification. Adaptive exogenous embeddings preserve accuracy even under graph corruption, so predictive performance is not evidence that the represented causal mechanisms are correct. Hidden confounding is not modeled by the DAG formulation. The encoder can also fail under distribution shift, as the cMNIST experiment demonstrates, and that failure propagates into the structural model.

Several evaluations use synthetic Bayesian networks or deliberately constructed causal relationships, biases, and fairness targets. Ground-truth concept interventions simulate corrections rather than evaluating deployment with human experts. The fairness result therefore demonstrates pathway control under a specified graph, not fairness guarantees for real hiring systems.

## Related Concepts

- [[concepts/causal-concept-bottlenecks|Causal Concept Bottlenecks]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]
- [[concepts/concept-embedding-models|Concept Embedding Models]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]
- Structural causal models
- Causal discovery
- Concept interventions
- Retrieval-augmented generation

## Related Papers

- Koh et al. (2020), "Concept Bottleneck Models": introduces the flat supervised concept bottleneck that C²BM restructures.
- [[Concept Embedding Models: Beyond the Accuracy-Explainability Trade-Off]]: provides a higher-capacity concept representation and an intervention baseline.
- Vandenhirtz et al. (2024), "Stochastic Concept Bottleneck Models": models statistical dependence among concepts but not a domain causal graph.
- Dominici et al. (2025), "Causal Concept Graph Models: Beyond Causal Opacity in Deep Learning": another graph-structured concept approach discussed as learning associations rather than causal relations.
- Moreira et al. (2024), "DiConStruct: Causal Concept-Based Explanations through Black-Box Distillation": learns post-hoc causal explanations of an opaque predictor.
- [[Toward Causal Representation Learning]]: motivates causal variables and mechanisms as inductive structure for robust representation learning.

[[index|Library home]]
