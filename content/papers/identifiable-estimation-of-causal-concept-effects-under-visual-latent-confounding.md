---
title: "Identifiable Estimation of Causal Concept Effects under Visual Latent Confounding"
type: paper
authors:
  - Thomas Melistas
  - Damian Machlanski
  - Kurt Butler
  - Angelos Korakitis
  - Nikos Spyrou
  - Athanasios Vlontzos
  - Yannis Panagakis
  - Sotirios A. Tsaftaris
  - Giorgos Papanastasiou
year: null
tags:
  - causal-machine-learning
  - concept-based-explanations
  - latent-confounding
  - identifiable-representations
  - variational-autoencoders
  - computer-vision
---

## TL;DR

This paper introduces UnCoVAEr, a latent-variable model for estimating [[concepts/causal-concept-effects|Causal Concept Effects]] when unannotated common causes of visual concepts and outcomes remain visible in an image. UnCoVAEr factorizes image latents by causal role and conditions their priors on observed concepts and outcomes as auxiliary variables. Under explicit factorization, exponential-family, decoder, and overlap assumptions, the learned adjustment representation is identifiable up to component-wise invertible transformations, which preserves backdoor adjustment. On semi-synthetic MorphoMNIST and CelebA tasks, it reports the lowest mean estimation error among non-oracle methods in five of six in-distribution settings and is within 0.001 of the best method in the sixth.

## Research Question

Can images serve as high-dimensional proxies for unobserved confounders so that causal effects of human-interpretable visual concepts can be estimated consistently, without assuming that the available concept annotations include every common cause of the concept and outcome?

## Motivation

Concept-based auditing often compares outcomes after changing an annotated concept. That comparison is causal only when common causes of the concept and outcome are adequately controlled. In images, missing demographic, acquisition, anatomical, or labeling factors may affect both a concept and an outcome while leaving visual signatures. A concept-only estimator then follows an open backdoor path, whereas direct adjustment on a high-dimensional image can create weak overlap and unstable estimates. Existing latent-variable estimators such as CEVAE and TEDVAE provide adjustment representations but do not generally identify their latent coordinates.

## Contributions

- Formalizes [[concepts/visual-latent-confounding|Visual Latent Confounding]], treating an image as a rich proxy for omitted common causes of visual concepts and outcomes.
- Introduces UnCoVAEr, which separates confounder, concept-specific, and outcome-specific latent factors and uses observed concepts and outcomes as auxiliary variables for identification.
- Shows that the adjustment latents are identifiable up to permutation and component-wise invertible transformations under the paper's assumptions, and proves that this ambiguity leaves the backdoor integral unchanged.
- Gives a Monte Carlo estimator for population and image-conditional causal concept effects, including propagation through a known DAG among concepts.
- Evaluates the approach under four MorphoMNIST confounding structures, a confounding-strength shift, and two CelebA hidden-attribute settings.

## Method

The observed data are images $X$, binary concepts $C$, and a binary outcome $Y$. The structural model divides latent factors into $Z_{\mathrm{conf}}$, which affects both concepts and outcome; $Z_C$, which affects concepts only; and $Z_Y$, which affects the outcome only. All three affect image appearance. The adjustment set is $Z_{\mathrm{adj}}=(Z_{\mathrm{conf}},Z_Y)$.

UnCoVAEr combines an image decoder, concept and outcome models, an [[concepts/amortized-variational-inference|Amortized Variational Inference]] network $q_\phi(Z\mid X,C,Y)$, and the structured conditional prior

$$
p_\psi(Z\mid C,Y)=p_\psi(Z_{\mathrm{conf}}\mid C,Y)p_\psi(Z_C\mid C)p_\psi(Z_Y\mid Y).
$$

Each prior component is a diagonal Gaussian whose parameters depend on its assigned auxiliary variables. Two coupled evidence lower bounds train the generative and conditional-prior components, while auxiliary predictors estimate $C$ from $X$ and $Y$ from $(X,C)$ for test-time inference. The conditioning is an identification device rather than a claim that concepts and outcomes causally generate the latent factors.

For an image, the estimator samples predicted concepts, a predicted outcome, and then a latent value to approximate $q_\phi(Z\mid X)$. It sets a target concept to 0 and 1, samples any descendants in the known concept DAG in topological order, evaluates the outcome model under both interventions, and averages their difference over latent samples and images.

The theoretical argument assumes the stated causal factorization with mutually independent latent groups and a known concept DAG; exponential-family conditional priors with sufficiently varying natural parameters; an almost-everywhere injective decoder with the required derivatives; and overlap for counterfactual evaluation. Auxiliary-variable VAE results then identify adjustment coordinates up to component-wise invertible maps. A change-of-variables argument shows that the transformed coordinates yield the same backdoor integral. Consistency is asymptotic in data, Monte Carlo samples, and model capacity.

## Experiments

MorphoMNIST uses thresholded thickness, intensity, slant, and width attributes with synthetic outcomes. Four settings hide a single confounder, multiple confounders, a common confounder, or a confounder alongside causally related observed concepts. Training and in-distribution testing use confounding strength $\alpha=0.9$; the out-of-distribution test uses $\alpha=0.6$. CelebA uses five binary attributes and a synthetic outcome with age, gender, and their interaction, then hides either age or gender. The metric is mean absolute CaCE error across concepts, averaged over five seeds.

On the in-distribution MorphoMNIST settings, UnCoVAEr reports errors of 0.048, 0.030, 0.059, and 0.077 for single, multiple, common, and causally related confounding. These are the lowest non-oracle values in every column except the single-confounder case, where the merged-latent UnCoVAErZ obtains 0.047. On CelebA, UnCoVAEr reports 0.052 with unknown age and 0.037 with unknown gender, the lowest non-oracle errors in both settings. The oracle errors are lower in all six settings.

Under the weaker-confounding MorphoMNIST shift, UnCoVAEr reports 0.045, 0.033, 0.059, and 0.077. It remains the best non-oracle method for multiple and causally related confounding, ties or nearly ties the best result for single confounding, and is slightly worse than the reported TEDVAE result of 0.058 in the common-confounder case. Direct image and residual adjustment are unstable in several settings, while CEVAE and TEDVAE do not consistently match the identifiable model.

## Limitations

The method cannot identify confounders that leave no visual trace. Its guarantees require a correct causal factorization, mutually independent latent groups, a known concept DAG, adequate auxiliary variation, an almost-everywhere injective decoder, overlap, sufficient model capacity, and successful asymptotic optimization; the experiments do not establish that these assumptions hold in real applications. The rank requirement also constrains latent dimensionality relative to the available auxiliary contexts.

Quantitative evaluation relies on synthetic outcomes and controlled hidden attributes rather than randomized real-world interventions. Both benchmarks use binary concepts and outcomes, and the paper leaves continuous variables for future work. Finite-sample behavior, the minimum label diversity needed for identification, sensitivity to a misspecified concept DAG, and validation on experimental interventions remain open. The oracle continues to outperform UnCoVAEr, and the proposed method is not uniformly best among non-oracle estimators in every shifted benchmark column.

## Related Concepts

- [[concepts/causal-concept-effects|Causal Concept Effects]]
- [[concepts/visual-latent-confounding|Visual Latent Confounding]]
- [[concepts/causal-representation-learning|Causal Representation Learning]]
- [[concepts/statistical-identifiability|Statistical Identifiability]]
- [[concepts/causal-overlap|Causal Overlap]]
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]
- [[concepts/concept-bottleneck-models|Concept Bottleneck Models]]

## Related Papers

- Goyal et al. (2020), "Explaining Classifiers with Causal Concept Effect (CaCE)": defines the causal concept estimand and a counterfactual-image estimator under unconfoundedness.
- Louizos et al. (2017), "Causal Effect Inference with Deep Latent-Variable Models": introduces CEVAE, a non-identifiable latent-adjustment baseline adapted to images here.
- Zhang, Liu, and Li (2020), "Treatment Effect Estimation with Disentangled Latent Factors": supplies the causal-role factorization used by TEDVAE and adapted by UnCoVAEr.
- Khemakhem et al. (2020), "Variational Autoencoders and Nonlinear ICA: A Unifying Framework": provides the auxiliary-variable identifiability result used in the analysis.
- Mita, Filippone, and Michiardi (2021), "An Identifiable Double VAE for Disentangled Representations": motivates the conditional-prior regularization and coupled objectives.
- [[papers/causally-reliable-concept-bottleneck-models|Causally Reliable Concept Bottleneck Models]]: models directed causal relations among visible concepts, whereas UnCoVAEr focuses on latent common causes.
- [[papers/statistical-and-structural-identifiability-in-representation-learning|Statistical and Structural Identifiability in Representation Learning]]: distinguishes stability across learned representations from recovery of data-generating latent structure.

[[index|Library home]]
