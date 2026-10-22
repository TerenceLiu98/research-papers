---
title: "Minimizing Rumor Influence in Multiplex Online Social Networks Based on Human Individual and Social Behaviors"
type: paper
authors:
  - Adil Imad Eddine Hosni
  - Kan Li
  - Sadique Ahmad
year: 2019
tags:
  - rumor-spreading
  - influence-minimization
  - multiplex-networks
  - social-networks
  - information-diffusion
  - rumor-refutation
---

## TL;DR

This paper jointly models rumor diffusion and intervention across multiplex online social networks. Its HISBmodel represents each person's attraction to a rumor with a damped oscillation governed by background knowledge, forgetting and remembering, and hesitation; it also incorporates opinion, social influence, and layer selection. A survival-analysis-based Truth Campaign Strategy (TCS) greedily selects users to spread a denying opinion. In simulations on single-network and multiplex datasets, TCS reduces the final share of rumor believers more than the compared methods in most reported settings, with larger benefits when intervention begins early.

## Research Question

How can rumor diffusion across multiple online social networks be modeled using individual and social behavior, and how can that model guide the selection of truth-campaign seeds that minimize the number of rumor believers?

## Motivation

Classical epidemic, independent-cascade, and linear-threshold models simplify user behavior and usually treat diffusion within one network. The paper argues that rumor intervention needs a model that distinguishes people from their accounts across platforms, represents changing interest and opinion, and measures belief rather than treating every exposed user as equally influenced. It also favors corrective campaigns over blocking users or links.

## Contributions

- Introduces HISBmodel, a microscopic rumor-spreading model for multiplex networks that combines individual attraction, opinion updates, social influence, and platform-layer selection.
- Models attraction to a rumor as a damped oscillation. Background knowledge controls damping, forgetting and remembering control oscillation, and hesitation controls phase.
- Defines rumor popularity as degree-weighted aggregate attraction and distinguishes infected users from believers, excluding users with denying opinions from the latter measure.
- Formulates TCS as a likelihood-based seed-selection problem using an additive survival model and supplies a greedy algorithm claimed to achieve a `1 - 1/e` approximation (about 63%).
- Evaluates the propagation model and intervention using Facebook, Twitter, Slashdot, and a Facebook-Twitter-YouTube multiplex, alongside two collections of real Twitter rumor timelines.

## Method

The multiplex representation separates individuals from their accounts in each platform layer. A sender first selects a layer according to relative in-degree. The probability of sending at time `t` depends on an attraction function

$$
A(t) = A_{int} e^{-\beta t}|\sin(\omega t + \delta)|,
$$

where `beta` represents individual background knowledge, `omega` forgetting and remembering, and `delta` hesitation. Acceptance depends on the relative in-degree of sender and receiver, capturing the assumption that authoritative users influence others but are harder to influence. Opinions accumulate from neighbors with diminishing weight for repeated exposures and are divided into denying, neutral, questioning, and supporting ranges.

After a rumor is detected, TCS chooses `k` users from those without a negative opinion to spread a denying opinion. The authors derive infection likelihoods from a survival-theory hazard function that sums transmission probabilities across neighbors and layers. The greedy algorithm repeatedly selects the user with the largest marginal increase in the likelihood of truth-campaign infection. The paper reports time complexity `O(nkN|E|)` for `n` layers, `N` individuals, and a budget of `k` selected users.

## Experiments

The evaluation uses single-network datasets from Facebook (4,039 nodes), Twitter (4,546 nodes), and Slashdot (77,360 nodes), plus a three-layer Facebook-Twitter-YouTube multiplex. The authors also use 458 Charlie Hebdo and 284 Ferguson rumor cascades from Twitter to compare temporal shapes. Model simulations compare HISBmodel with SIR, independent-cascade, and linear-threshold baselines. Intervention experiments compare TCS with natural propagation, degree-based greedy selection, DRIMUX, link deletion, a positive campaign, and LCAC. Detection times range from 2 to 15 simulation steps, target budgets from 5% to 20%, and experiments are generally repeated 500 times.

- HISBmodel produces rapid growth followed by a slower, fluctuating decline, qualitatively resembling the supplied real-rumor timelines more closely than the tested baselines. This is a comparison of temporal shape, not a fitted predictive validation.
- In the paper's aggregate analysis of single-network simulations, TCS reduces the number of rumor believers by 52% on average, compared with 41% for DRIMUX.
- In multiplex simulations, the reported average reduction is 71% for TCS, 63% for LCAC, 52% for the positive campaign, and 12% for DRIMUX.
- The reported best-case setting, detection time 2 and 20% budget, yields a 69% average reduction for TCS versus 41% for DRIMUX. In the worst-case setting, detection time 15 and 5% budget, TCS yields 31% versus 17% for the second-best method.
- Earlier detection and larger target budgets generally improve intervention. TCS is not uniformly best in every late-detection, single-network configuration; DRIMUX leads in some such cases.
- Simulations associate lower background knowledge and higher forgetting/remembering and hesitation parameters with more sending and greater selection probability under TCS. Node degree, rather than those individual factors, drives acceptance under the model's specified rules.

## Limitations

The behavioral parameters are assigned from uniform random distributions rather than estimated from user profiles or intervention data. The acceptance, authority, opinion, and platform-selection rules are modeling assumptions, and the experiments use observed network topology without calibrating those mechanisms to real users. Comparison with real rumor cascades is qualitative and based on normalized propagation trends. The intervention results therefore establish performance inside HISBmodel simulations rather than causal effectiveness on deployed social platforms. The model assumes aligned identities and the same node set across layers by adding absent accounts as isolated nodes, and it treats one rumor at a time. The authors leave empirical estimation of human factors, multiple-rumor dynamics, breaking-news rumors, and community structure for future work.

## Related Concepts

- [[Misinformation Spreading Models]]
- [[Rumor Refutation on Social Media]]
- [[Social Network Analysis]]
- Survival analysis
- Multiplex networks
- Submodular optimization

## Related Papers

- [[Minimizing the Misinformation Concern over Social Networks]]
- Hosni, Li, and Ahmed (2018), "HISBmodel: A rumor diffusion model based on human individual and social behaviors in online social networks."
- Hosni, Li, Ding, and Ahmed (2018), "Least cost rumor influence minimization in multiplex social networks."
- Gomez-Rodriguez and Leskovec (2013), "Modeling information propagation with survival theory."
- Wang et al. (2017), "DRIMUX: Dynamic rumor influence minimization with user experience in social networks."
- Tong, Du, and Wu (2018), "On misinformation containment in online social networks."

[[index|Library home]]
