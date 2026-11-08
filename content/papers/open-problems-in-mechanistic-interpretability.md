---
title: "Open Problems in Mechanistic Interpretability"
type: paper
authors:
  - Lee Sharkey
  - Bilal Chughtai
  - Joshua Batson
  - Jack Lindsey
  - Jeff Wu
  - Lucius Bushnaq
  - Nicholas Goldowsky-Dill
  - Stefan Heimersheim
  - Alejandro Ortega
  - Joseph Bloom
  - Stella Biderman
  - Adria Garriga-Alonso
  - Arthur Conmy
  - Neel Nanda
  - Jessica Rumbelow
  - Martin Wattenberg
  - Nandi Schoots
  - Joseph Miller
  - Eric J. Michaud
  - Stephen Casper
  - Max Tegmark
  - William Saunders
  - David Bau
  - Eric Todd
  - Atticus Geiger
  - Mor Geva
  - Jesse Hoogland
  - Daniel Murfet
  - Tom McGrath
year: 2025
source_job_id: "5891802c-003c-457a-a935-f49a8c69bdbe"
tags:
  - mechanistic-interpretability
  - neural-network-interpretability
  - ai-safety
  - research-agenda
---

## TL;DR

This forward-looking review organizes [[concepts/mechanistic-interpretability|Mechanistic Interpretability]] around two methodological directions: reverse engineering, which assigns roles to discovered network components, and concept-based interpretability, which searches for components associated with prespecified roles. It argues that current decompositions, descriptions, and validation methods are not yet sufficient for reliable monitoring, control, prediction, scientific discovery, or governance. Progress requires stronger foundations, causal and application-relevant evaluation, comparisons with black-box baselines, broader model coverage, and attention to socio-technical risks.

## Research Question

Which methodological, application-level, and socio-technical problems most constrain mechanistic interpretability, and which research directions could turn its partial technical progress into reliable scientific and engineering tools?

## Motivation

Neural networks learn capabilities without developers specifying or generally understanding their internal mechanisms. A useful mechanistic account could support monitoring and control, predict behavior outside familiar evaluations, improve training and inference, and expose scientific knowledge represented by a model. The review emphasizes that these benefits remain prospective: modern systems are still usually trained, evaluated, and governed without mechanistic tools, and readable internal features do not by themselves provide dependable explanations or safety assurances.

## Contributions

- Defines mechanistic interpretability as studying mechanisms underlying neural-network generalization, distinguishing it from local output attribution and interpretability-by-design.
- Frames bottom-up reverse engineering as decomposition, functional description, and validation, and contrasts it with top-down concept-based probing.
- Audits sparse dictionary learning, component-description methods, causal interventions, benchmarks, circuit discovery, and automated interpretability, identifying both practical and conceptual limitations.
- Organizes applications around monitoring and red-teaming, behavioral control, prediction, training and inference, "microscope AI," architecture transfer, and interfaces to model internals.
- Connects technical progress to policy, oversight, incident analysis, compliance, and copyright while warning about false assurance, selective transparency, misuse, and unclear success criteria.
- Supplies a detailed appendix of open questions spanning methods, applications, governance, and philosophy.

## Method

The paper is a forward-facing narrative review rather than a new algorithm or empirical study. Its organizing framework has two methodological branches.

In **reverse engineering**, researchers first choose a decomposition of the network, then hypothesize the functional roles of components by studying their activation causes and downstream effects, and finally validate those hypotheses. Candidate decompositions include architectural units, dimensionality-reduction directions, and sparse dictionary latents. Description tools include maximally activating examples, attribution, feature synthesis, logit lenses, and causal interventions. Validation can use held-out predictions, behavior prediction, hand-coded replacement mechanisms, models with known algorithms, and ground-truth benchmarks.

In **concept-based interpretability**, researchers define a concept, construct labeled or counterfactual data, and train a probe or search for a corresponding activation subspace. [[concepts/linear-probing|Linear Probing]] establishes decodability, not causal use, so intervention-based evidence is needed for stronger mechanistic claims.

The review uses circuit discovery as a worked pipeline joining these choices: define a task, decompose the network into a graph, locate task-relevant nodes and edges, iterate between description and validation, and evaluate faithfulness, minimality, and completeness. It then assesses potential applications along five axes: the quality of the initial model capability, decomposition quality, description quality, completeness, and scalability.

## Experiments

The review reports no original experiments and does not provide a quantitative meta-analysis. Instead, it synthesizes results and negative evidence from the literature. Representative observations include:

- Sparse dictionary reconstructions can materially degrade model performance. The review reports that inserting a 16-million-latent dictionary into GPT-4 produced language-modeling loss comparable to a model trained with 10% of GPT-4's pretraining compute, while SAE reconstructions reduced GPT-2 small performance by 10% on task-specific training and 40% on the full distribution in another study.
- Sparse dictionary learning can produce interpretable latents, but reconstruction error is structured; sparsity does not guarantee interpretability; feature splitting, absorption, geometry, distributed representations, and missing user-relevant concepts remain unresolved.
- Automated descriptions of neurons and sparse features can be scored by activation prediction, but such scores validate a limited description task rather than a complete causal account of model computation.
- Existing circuit analyses depend on the task definition, component basis, and intervention implementation. Scalable gradient-based localization is approximate, while backup and performance-suppressing components complicate circuit recovery.
- Activation steering, red-teaming based on internal directions, model editing, capability prediction, and interpretability-assisted science show promising cases, but the paper does not claim that they establish mature or generally superior mechanistic methods.

These examples motivate an evaluation standard based on causal validity and downstream utility rather than surface readability alone.

## Limitations

- As a broad agenda paper, the review prioritizes coverage and synthesis over a systematic-review protocol, formal evidence grading, or reproducible meta-analysis.
- Its taxonomy and priorities reflect the authors' framing of a fast-moving field; the appendix enumerates questions but does not rank them by tractability, expected value, or required resources.
- Many cited successes concern toy models, small models, narrowly defined tasks, or selected examples. The review explicitly cautions against generalizing them to frontier systems or arbitrary behaviors.
- The discussion concentrates on CNNs, BERT-style models, and GPT-style transformers, while transfer to state-space, diffusion, multimodal, and future architectures remains uncertain.
- Mechanistic explanations can be context-dependent and dual-use. Technical progress alone does not determine whether an explanation improves governance, user understanding, or safety.
- The supplied Markdown does not state a stable paper identifier, so none is added here.

## Related Concepts

- [[concepts/mechanistic-interpretability|Mechanistic Interpretability]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]]
- [[concepts/linear-probing|Linear Probing]]
- [[concepts/attribution-patching|Attribution Patching]]
- [[concepts/irreducible-multidimensional-features|Irreducible Multidimensional Features]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]

## Related Papers

References discussed in the supplied paper:

- Bereska and Gavves (2024), "Mechanistic Interpretability for AI Safety - A Review": surveys the relationship between mechanistic methods and AI safety.
- Elhage et al. (2021), "A Mathematical Framework for Transformer Circuits": develops the superposition and transformer-circuit framing that motivates later decomposition work.
- Huben et al. (2024), "Sparse Autoencoders Find Highly Interpretable Features in Language Models," and Gao et al. (2024), "Scaling and Evaluating Sparse Autoencoders": representative sparse dictionary learning studies.
- Wang et al. (2023), "Interpretability in the Wild: a Circuit for Indirect Object Identification in GPT-2 Small": a prominent circuit-discovery case study.
- Bills et al. (2023), "Language Models Can Explain Neurons in Language Models": automates natural-language component description and evaluation.
- Rauker et al. (2023), "Toward Transparent AI: A Survey on Interpreting the Inner Structures of Deep Neural Networks": provides broader context and motivates application-centered evaluation.

Related library reading, without implying citation by this paper:

- [[papers/transformer-field-theory-a-response-theoretic-approach-to-mechanistic-interpretability|Transformer Field Theory: A Response-Theoretic Approach to Mechanistic Interpretability]] studies local linear predictions of intervention effects and their propagation.
- [[papers/discovering-sparse-concept-graphs-for-mechanistic-interpretability-in-vision-transformers|Discovering Sparse Concept Graphs for Mechanistic Interpretability in Vision Transformers]] builds and causally tests graphs over sparse vision features.

[[index|Library home]]
