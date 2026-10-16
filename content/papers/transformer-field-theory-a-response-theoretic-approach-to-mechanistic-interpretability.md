---
title: "Transformer Field Theory: A Response-Theoretic Approach to Mechanistic Interpretability"
type: paper
authors:
  - David N. Olivieri
  - Antonio F. Perez Rodriguez
year: null
source_job_id: "2ce4e3bb-cb4d-4a39-b3da-e0112ba700d3"
tags:
  - mechanistic-interpretability
  - activation-patching
  - linear-response
  - transformer-dynamics
---

## TL;DR

Transformer Field Theory treats a fixed forward pass's residual stream as a field over depth and token position. Gradients predict small patch effects, while Green operators describe their downstream propagation. Experiments on GPT-2-style models support a bounded local linear regime and show partial answer transfer from prompt-specific activation differences. Constrained patch inference and transfer of response structure across model sizes are proposed extensions, not demonstrated solutions.

## Research Question

Can residual-stream interventions be organized by reusable sensitivity and propagation operators, and can those operators supply a forward model for inferring where and how to patch a Transformer?

## Motivation

Exhaustive activation patching requires separate interventions across layers, tokens, components, and directions. A local response description can predict families of interventions from a clean-run gradient and characterize how perturbations travel through the model. The paper connects this practical goal to continuous-depth dynamics, adjoint methods, and response-field theory.

## Contributions

- Defines a depth-token residual field and represents activation patches as localized additive sources, including projected activation differences and sources supported across a layer interval.
- Relates [[concepts/attribution-patching|Attribution Patching]] to an adjoint sensitivity field and describes propagation through [[concepts/transformer-green-operators|Transformer Green Operators]].
- Tests local linearity, superposition, sensitivity predictions, downstream propagation, sensitivity concentration, and component-level operator slices.
- Formulates minimum-cost patch selection under behavioral and dynamical constraints, and proposes response-based correspondence between related models with additional large-model anchors.
- Tests prompt-induced residual differences as local transformation directions on country-capital prompts.

## Method

For a fixed model and prompt, let $R_\ell(x)$ denote the residual vector after block $\ell$ at token $x$. A local intervention adds $\epsilon J$ at one such site. For a scalar observable $y$, usually a next-token logit difference, the first-order prediction is

$$
\delta y_{\mathrm{pred}}=\epsilon a(\ell,x)^\top J,
\qquad a(\ell,x)=\frac{\partial y}{\partial R_\ell(x)}.
$$

The measured effect is the patched-minus-clean observable. Absolute error and relative error with a denominator floor diagnose prediction quality. Near-zero signals require special care because relative errors can grow without a substantial absolute discrepancy (Sections VII-IX).

The continuum idealization writes residual evolution as $\partial_t R=\mathcal F_t[R]+J$. Linearizing around the clean trajectory gives a forward propagator; the backward adjoint gives readout sensitivity. In the finite model, a sliced Green operator is the Jacobian

$$
G_{(\ell,x)\leftarrow(\ell',x')}=
\frac{\partial R_\ell(x)}{\partial R_{\ell'}(x')}
\in\mathbb R^{d_{\mathrm{model}}\times d_{\mathrm{model}}}.
$$

Patched-minus-clean residuals measure direction-specific propagation. The paper also compares direct propagation with reinjection of an intermediate response field, ranks candidate source sites by $\|a(\ell,x)\|$, and examines component mixing and entrywise energy in operator slices (Sections X-XII).

The proposed inverse problem minimizes a patch cost subject to a target output shift and the patched dynamics. In a local linear regime, a target residual displacement satisfies approximately $\Delta R=GJ$, with constraints on source support, directions, or sparsity. The scaling proposal matches incoming and outgoing response fingerprints across models. It requires anchors such as large-model activations, local probes, or calibration patches; small-model response information alone does not identify a correspondence (Sections V-VI).

## Experiments

The experiments use capital-completion prompts, including a country-capital list ending with Spain, a repetitive variant, a prose context, and matched country substitutions. The main fixed-prompt observable compares the Madrid and London answer logits. Prompt-pair experiments compare the source and target capitals instead (Section VII).

| Test | Reported evidence |
| --- | --- |
| Local linearity and superposition | At layer 7 and the final token, nonlinear and superposition errors remain mostly below a 0.20 visual reference level over the displayed perturbative range. Larger perturbations increase departures; tiny amplitudes can cause denominator artifacts (Figure 2). |
| Sensitivity prediction | Autograd gradients predict scalar patch effects in the local regime. Individual sweeps include accurate, mixed, low-signal, and nonlinear cases (Figures 3-4). |
| Propagation and composition | Responses concentrate near the source and spread anisotropically across later layers and tokens. Repetitive prompts produce periodic structure. Intermediate-field reinjection has its smallest reported errors at intermediate amplitudes (Figures 5-6). |
| Reduced descriptions | Sensitivity norms concentrate on a limited set of sites. An adjacent-layer, same-token slice shows diagonal persistence and off-diagonal mixing. Slices targeting layer 11, token 108 from layer 0 distribute energy across many entries, limiting simple magnitude-based compression (Figures 7-9). |
| Prompt displacement | For 20 country-capital pairs, GPT-2 small at layer 10 and the final token shows close agreement between predicted and measured scalar changes over the tested amplitudes; absolute error grows with amplitude (Figures 10-11). |
| Depth and answer transfer | At unit displacement amplitude, GPT-2 small and medium show weak early-layer effects and sharply stronger late-layer effects. Target-answer ranks improve, often approaching the clean target-prompt rank, with stronger reported effects in medium (Figures 12-14). |

Prompt displacement uses $J_{A\to B}=R(q_B;\ell,x)-R(q_A;\ell,x)$ injected into the source run. Its toward fraction normalizes the induced logit change by the signed clean prompt-to-prompt change, so one denotes the full clean scalar shift. Direction comparisons at final-token layers 10 in small and 22 in medium show positive alignment with country-embedding differences, capital-embedding differences, and the local gradient. These are pair-specific transformations, rather than a demonstrated universal steering vector (Section XIII).

## Limitations

- Empirical evidence concerns GPT-2-style models and controlled capital-completion contexts. It does not establish general behavior across tasks, modern model families, or arbitrary patch amplitudes.
- The continuum is an organizing idealization; measurements are discrete. The full Green operator is not estimated, and field reinjection is not a direct test of composition of three independently estimated full operators.
- First-order approximations have a bounded regime. The superposition test adds two directions without renormalizing their sum, so equal amplitude does not imply equal perturbation norm.
- Concentrated scalar sensitivity does not establish a sparse full response operator. The sliced-operator energy curves explicitly show limits to entrywise compression.
- Patch inference is formulated but not solved empirically. Similar normalized-depth profiles in small and medium do not validate the proposed cross-model response map.
- The supplied Markdown has malformed equations and displaced algorithm text. This summary uses legible definitions, prose, and captions; it does not infer unreported numerical fits or amplitude bounds. Publication year and a stable identifier for this paper are absent, so the year is unset.

## Related Concepts

- [[concepts/attribution-patching|Attribution Patching]]
- [[concepts/transformer-green-operators|Transformer Green Operators]]
- [[concepts/model-steerability|Model Steerability]]
- [[concepts/sparse-autoencoders|Sparse Autoencoders]] provide possible feature directions for subspace interventions, rather than an experimentally evaluated component of this paper.

## Related Papers

References discussed in the supplied paper:

- Nanda (2023), "Attribution Patching: Activation Patching at Industrial Scale," and Syed, Rager, and Conmy (2024), "Attribution Patching Outperforms Automated Circuit Discovery": gradient-displacement prediction of patch effects.
- Zhang and Nanda (2023), "Towards Best Practices of Activation Patching in Language Models: Metrics and Methods": intervention and metric choices.
- Chen et al. (2018), "Neural Ordinary Differential Equations": continuous-depth dynamics and adjoints.
- Todd et al. (2024), "Function Vectors in Large Language Models," and Turner et al. (2023), "Steering Language Models With Activation Engineering": behavior-changing activation directions.
- Huh et al. (2024), "Position: The Platonic Representation Hypothesis": context for the proposed shared response geometry across models.

Related library reading, without implying citation by this paper:

- [[papers/not-all-language-model-features-are-one-dimensionally-linear|Not All Language Model Features Are One-Dimensionally Linear]] studies causal interventions on multidimensional representation subspaces, complementing the present paper's local response analysis.

[[index|Library home]]
