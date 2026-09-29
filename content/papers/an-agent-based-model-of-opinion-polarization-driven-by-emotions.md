---
title: "An Agent-Based Model of Opinion Polarization Driven by Emotions"
type: paper
authors:
  - Frank Schweitzer
  - Tamas Krivachy
  - David Garcia
year: 2020
tags:
  - opinion-dynamics
  - collective-emotions
  - agent-based-modeling
  - polarization
---

## TL;DR

An agent-based model generates consensus or polarized continuous opinions through shared emotional information. Agents' valence and arousal produce a decaying communication field that feeds back on emotions and drives slower opinion dynamics. Analytical bifurcations and stochastic simulations show how activity, emotional imbalance, and bias can change the opinion distribution. These are model results; the proposed emotion-to-opinion mechanism is not validated against empirical opinion data.

## Research Question

Under what conditions can emotional interactions produce consensus or two opposing opinion clusters without agents directly responding to one another's opinions?

## Motivation

Earlier models sometimes identify emotional valence with opinion, obscuring their different meanings and timescales. This paper separates fast emotional states from slower opinions and builds on the Cyberemotions framework, in which agents communicate through a common information field. Empirical support for components of emotional dynamics motivates the construction but does not establish the new coupling to opinions (Sections 1–3).

## Contributions

- Couples valence, arousal, and continuous opinions while keeping them separate state variables.
- Uses accumulated emotional expressions as an indirect interaction mechanism shared by all agents.
- Identifies a symmetric transition from neutral consensus to two stable opposing opinions, then examines bias and asymmetric forcing.
- Illustrates unequal opinion-cluster sizes and consensus with stochastic simulations, and proposes observational validation strategies.

## Method

Each agent has valence $v_i$, arousal $a_i$, and opinion $\theta_i$. An agent expresses emotion when arousal reaches its individual threshold $\tau_i$, drawn uniformly from a specified interval. The expression has common magnitude $s$ and the sign of the agent's valence; arousal resets to zero after expression. Positive and negative expressions accumulate separately:

$$
\dot h_\pm=-\gamma_\pm h_\pm+sN_\pm+I_\pm,
\qquad h=h_++h_-,\qquad \Delta h=h_+-h_-.
$$

Here $N_\pm$ counts agents expressing the corresponding sign, decay represents fading attention, and external inputs $I_\pm$ are omitted in the subsequent analysis. The total field measures emotional activity, while its imbalance measures emotional charge (Equations 1–3). This is the [[concepts/collective-emotional-fields|Collective Emotional Fields]] mechanism.

Valence follows damped stochastic dynamics with linear reinforcement and cubic saturation from the corresponding field component. Arousal follows a quadratic response to total activity, with noise helping initiate or restart communication. Under the chosen symmetric valence response, nonzero deterministic valence requires $b_1h_\pm>\gamma_v$, with $b_3<0$ providing saturation (Equations 6–7).

The opinion equation is given as

$$
\dot\theta_i=-c_0h\bar v+c_1(h-h_{\mathrm{base}})\theta_i
+\alpha_2\theta_i^2+\alpha_3\theta_i^3+A_\theta\xi_\theta(t).
$$

Thus $\alpha_0(t)=-c_0h\bar v$ supplies emotional forcing and $\alpha_1(t)=c_1(h-h_{\mathrm{base}})$ controls amplification above a baseline activity level. The fixed coefficient $\alpha_2$ introduces asymmetry and $\alpha_3<0$ limits extreme opinions. The authors approximate mean valence by $\bar v=c_0\Delta h$ to reduce the variables (Equations 11 and 15).

For the deterministic symmetric case $\alpha_0=\alpha_2=0$, the fixed points are $0$ and $\pm\sqrt{-\alpha_1/\alpha_3}$. With $\alpha_3<0$, the neutral state is stable for $\alpha_1<0$; for $\alpha_1>0$, it becomes unstable and two stable nonzero states emerge. Sufficiently strong constant forcing can remove this coexistence. Section 4.2 examines stability and basin separation through a phase portrait of the cubic dynamics. These fixed-coefficient results help interpret the fluctuating coefficients in the full stochastic system.

## Experiments

Section 4.1 uses $N=100$ agents, time step $\delta t=0.2$, thresholds uniformly distributed over $[0.1,1.1]$, field decay $\gamma_h=0.7$, expression magnitude $s=0.6$, baseline $h_{\mathrm{base}}=0.1$, and opinion-noise amplitude $A_\theta=0.05$. Opinions initially follow the reported normal distribution $\mathcal N(0,0.3)$, whose second parameter is described as variance. Emotional parameters are selected with reference to earlier empirical work; parameters are deliberately placed in regimes of interest rather than fitted to opinion outcomes.

- **Polarization:** Figure 4 shows initially nearby opinions separating into two clusters. Distributions at $t=100$ compare $\alpha_2=0$ and $\alpha_2=2$, with $\alpha_3=-5$. Bias changes the relative cluster sizes, producing a minority and majority.
- **Consensus:** Figure 5 illustrates neutral consensus with $\alpha_2=0$ and positively biased consensus with $\alpha_2=4$ under the illustrated consensus settings. This is not evidence that changing $\alpha_2$ alone universally produces consensus.
- **Analytical interpretation:** Fixed-point and phase-portrait analyses characterize stable outer opinions and an unstable intermediate region. The phase portrait is solved numerically using fourth-order Runge–Kutta integration.

Emotional activity and imbalance fluctuate endogenously, so the simulations do not reach a strictly stationary opinion distribution. The study provides illustrative trajectories and distributions, not an empirical prediction benchmark or an uncertainty assessment across repeated runs.

## Limitations

The manuscript reports no empirical dataset. Proposed validation through comment sentiment, activity counts, likes/dislikes, or endorsement-network communities remains future work. Prior calibration of emotional dynamics does not validate the assumed influence of emotions on opinions, and sentiment and issue positions would need to be distinguished in such a test (Section 5).

The model uses a common field accessible to all agents, equal expression magnitudes, one opinion dimension, and omitted external inputs. Multidimensional opinions and their polarization measures are discussed as extensions. Its bimodal distribution concerns continuous opinion positions, not a direct measure of partisan hostility.

**Source consistency:** The supplied Markdown contains unresolved sign and coefficient inconsistencies. Around Equations 9–11, prose associates large positive $\alpha_0$ with a negative sole equilibrium, whereas the displayed cubic with $\alpha_3<0$ implies the opposite direction. The coupling discussion also refers to changing $\alpha_3$ where the surrounding argument concerns $\alpha_0$. Equation 14 is printed as $\dot\theta_i=\mu(\theta_i-\bar\theta)$ for positive $\mu$, which drives deviations away from the mean, despite the prose describing convergence and equivalence to bounded confidence. This page preserves Equation 11 and the symmetric bifurcation result without treating those directional claims or the claimed equivalence as established. It cannot determine whether the inconsistencies originate in the publication or its transcription.

## Related Concepts

- [[concepts/collective-emotional-fields|Collective Emotional Fields]]: indirect coupling through accumulated emotional expressions.
- [[concepts/opinion-dynamics|Opinion Dynamics]]: continuous states, consensus, and nonlinear polarization mechanisms.
- [[concepts/political-polarization|Political Polarization]]: broader substantive context; the model operationalizes polarization as a bimodal opinion distribution.
- [[concepts/emotion-appraisal|Emotion Appraisal]]: background on emotion generation; this model uses valence and arousal rather than implementing an appraisal process.
- [[concepts/ideological-dimensionality|Ideological Dimensionality]]: relevant to the proposed extension beyond a scalar opinion.

## Related Papers

- Schweitzer and Garcia (2010), "An agent-based model of collective emotions in online communities": the emotional-interaction framework used here (source reference 9).
- Garcia, Kappas, Kuster, and Schweitzer (2016), "The dynamics of emotions in online interaction": empirical motivation for the emotional response functions (source reference 11).
- [[papers/polarization-induced-stress-in-the-noisy-voter-model|Polarization-induced stress in the noisy voter model]]: related Wiki reading, not cited by this paper; changes binary-state switching rates in response to population balance rather than maintaining separate valence and arousal states.
- [[papers/the-dynamics-of-political-polarization|The dynamics of political polarization]]: related Wiki synthesis, not cited by this paper, placing feedback mechanisms within broader complex-systems approaches.

[[index|Library home]]
