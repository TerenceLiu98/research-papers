---
title: Maximum-Entropy RL for Posterior Sampling
type: concept
tags:
  - reinforcement-learning
  - bayesian-inference
  - gflownets
---

## Overview

A generative policy can target a posterior by treating the log unnormalized posterior density as its terminal reward and maximizing expected reward plus entropy. For normalized target $p(z)=\exp(R(z))/Z$,

$$
\mathbb E_{\pi}[R(z)]+\mathcal H[\pi]
=\log Z-D_{\mathrm{KL}}(\pi\Vert p).
$$

At the unrestricted optimum, the policy matches the target distribution. With a finite neural policy and finite training, this is an inference objective rather than a guarantee of exact samples.

## Key Ideas

- **Entropy changes the target:** Expected log-density alone encourages concentration at modes. The entropy term makes matching the whole target distribution optimal. The displayed identity uses entropy coefficient one.
- **Sequential construction:** Structured objects can be assembled through policy actions. In ERRLESS, each expression has a unique postorder sequence, followed by sampling continuous constants and noise.
- **Trajectory balance:** For that unique-path construction, the loss is $[\log Z_\varphi+\log\pi_\varphi(z)-R(z)]^2$. Zero residual across the target support implies density matching. This simplified form should not be transferred unchanged to construction graphs with multiple paths to the same object.
- **Off-policy learning:** Trajectory balance allows samples from exploratory behavior policies and replay buffers. Coverage of relevant outcomes and successful optimization still matter.
- **Amortization scope:** Once trained, a policy generates repeated samples without running a new search chain for each draw. This does not imply that the same policy handles new datasets without training.

## Important Papers

- [[papers/bayesian-symbolic-regression-with-entropic-reinforcement-learning|Bayesian Symbolic Regression with Entropic Reinforcement Learning]]: applies this connection to joint expression, constant, and noise sampling using trajectory balance.
- Malkin et al. (2022), "Trajectory balance: Improved credit assignment in GFlowNets": objective foundation cited by ERRLESS.
- Deleu et al. (2024), "Discrete probabilistic inference as control in multi-path environments": cited work connecting structured inference and sequential control.

## Related Concepts

- [[concepts/bayesian-symbolic-regression|Bayesian Symbolic Regression]]: a mixed discrete-continuous posterior target for this approach.
- [[concepts/amortized-variational-inference|Amortized Variational Inference]]: related learned posterior approximation; distinguish sharing across draws from sharing across observations.
