---
title: Static and dynamic jamming games over wireless channels with mobile strategic players
type: paper
authors:
  - Giovanni Perin
  - Leonardo Badia
year: null
tags:
  - wireless-communications
  - game-theory
  - reinforcement-learning
---

## TL;DR

The paper models a mobile receiver and jammer as adversaries choosing positions along a line. Static analysis motivates strategies for three dynamic information settings, evaluated with tabular Q-learning and dueling deep Q-networks. In a simulated noisy, shadowed vehicular setting, a learned receiver achieves about 2.5 times the spectral efficiency of a random receiver against a learning jammer.

## Research Question

How do constrained mobility, move timing, and knowledge of an opponent’s position change the strategies and communication performance of a receiver–jammer game?

## Motivation

A receiver benefits both from approaching its transmitter and from escaping interference. A mobile jammer can react to that movement, so independently choosing fixed locations cannot represent the ensuing pursuit. The study isolates this strategic interaction through a simple propagation model and linear geometry.

## Contributions

- A static zero-sum location game with reported equilibrium characterizations and a closed-form solution for a noise-free surrogate utility.
- Three dynamic games separating alternating moves, simultaneous moves with disclosed positions, and simultaneous moves with hidden opponent positions.
- Learning-based numerical policies and comparisons with random and deterministic movement baselines, including noise and shadowing.

## Method

A stationary, nonstrategic access point lies at the origin; receiver and jammer positions are $x,y\in[L,M]$, with $0<L<M$. The receiver maximizes communication performance and the jammer minimizes it. The physical model uses Shannon capacity with signal-to-noise-plus-jamming ratio. Most analysis instead uses the interference-dominated surrogate

$$u_R(x,y)=-u_J(x,y)=\frac{|x-y|^\alpha}{x^\alpha}.$$

For this surrogate, Theorem 4 reports a jammer location $y^*=2LM/(L+M)$ and a receiver mixture assigning probabilities $L/(L+M)$ and $M/(L+M)$ to the two endpoints. The reported value is $((M-L)/(M+L))^\alpha$. These are paper-reported results, not an independently verified equilibrium certificate for arbitrary capacity objectives.

Dynamic positions are discretized, and each move stays still or shifts by up to one or two grid cells. In G1, players alternate and observe both positions. In G2, moves are simultaneous and current opponent actions are concealed until realized. In G3, agents observe their own positions and rewards but not the opponent’s position. Both players learn concurrently using epsilon-greedy Q-learning; a dueling network approximates state values and action advantages for larger experiments. The paper calls this network DDQN, meaning *dueling* deep Q-network.

## Experiments

The main grid has nine positions from 10 to 50 with spacing 5 and path-loss exponent 2. Tabular runs use 1.5 million iterations and discount factor 0.99. The dueling network uses three hidden layers of 512 neurons, batch size 128, and a replay buffer of 10,000.

- **Information and timing:** complete-information reward curves stabilize around 750,000 iterations. Hidden-position play exhibits oscillations as opponents adapt. Among the three tested settings, hiding positions benefits the receiver most; simultaneous play with disclosed positions benefits the jammer most.
- **Learned behavior:** the sequential receiver alternates near the access point while the jammer follows. With hidden positions, the jammer concentrates near the access point and the receiver favors separated regions, qualitatively resembling the static strategy structure.
- **Mobility and baselines:** allowing two-cell moves improves receiver reward in the tested dynamic settings. Learning jammers outperform the tested greedy and randomized heuristic jammers.
- **Noise and shadowing:** Section 6.5 runs each setting ten times with $L=10$ m, $M=570$ m, 15 positions, two-cell moves, and path-loss exponent varying from 2 to 3. The strategic receiver obtains about 2.5 times the spectral efficiency of random movement; deterministic greedy movement performs worst because the learning jammer can predict it.

## Limitations

The study uses one-dimensional movement, fixed power, and simplified propagation. The noiseless utility is a surrogate: nonlinear transformations of utility need not preserve mixed-strategy equilibria. The source’s general equilibrium claims and proof expressions therefore deserve care rather than automatic transfer to Shannon-capacity objectives. Reward stabilization in concurrent Q-learning is empirical evidence of stable behavior, not a measured bound on unilateral deviation gains. Physical online training would require too many movement steps; the authors propose offline training followed by adaptation. More general geometries and Bayesian inference remain future work.

The supplied Markdown does not establish a publication year or a stable identifier for this paper; the year is left unspecified.

## Related Concepts

- [[concepts/mobile-jamming-games|Mobile Jamming Games]]: movement jointly controls useful signal strength and interference exposure.
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: provides an incentive-based criterion stronger than observing a stable learning curve; this paper does not report such an error certificate.

## Related Papers

- Perin and Badia, *Reinforcement learning for jamming games over AWGN channels with mobile players* (CAMAD, 2021), DOI: 10.1109/CAMAD52502.2021.9617811. The source identifies this as an earlier one-step-mobility study extended here.
- Bhattacharya, Gupta, and Basar, *Jamming in mobile networks: A game-theoretic approach* (2013), DOI: 10.3934/naco.2013.3.1. The source contrasts its continuous-time, complete-information formulation with discrete movement and hidden positions.
