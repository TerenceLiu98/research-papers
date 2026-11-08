---
title: "LeHami: Symplectic Latent Dynamics for World Models"
type: paper
authors:
  - Romina Yalovetzky
  - Randall Balestriero
  - Yann LeCun
year: 2026
code: https://github.com/rominay/LeHami
tags:
  - world-models
  - joint-embedding-predictive-architectures
  - symplectic-dynamics
  - hamiltonian-neural-networks
  - model-predictive-control
---

## TL;DR

LeHami replaces an autoregressive [[concepts/joint-embedding-predictive-architectures|JEPA]] predictor with an action-conditioned Hamiltonian flow over position-like and momentum-like latents. An exactly symplectic leapfrog step preserves latent phase-space volume for every parameter setting and action sequence, ruling out uniform contraction, asymptotically stable fixed points, and merging of distinct states. Pendulum experiments support the volume and velocity-prediction claims, but planning results are mixed: LeHami is compute-efficient and captures signed velocity structurally, while an untied temporal LeWorldModel baseline achieves higher goal-reaching success.

## Research Question

Can geometric structure prevent contraction during autoregressive latent rollouts while retaining the full position-and-velocity state needed for prediction and control?

## Motivation

Representation regularizers can prevent an encoder from mapping all inputs to a constant, but they do not constrain the transition repeatedly applied at inference. A slightly contractive predictor can therefore shrink the latent distribution over long rollouts. For second-order systems, a per-frame representation also omits motion unless temporal context or another velocity-aware mechanism is introduced. LeHami addresses both issues by placing [[concepts/symplectic-latent-dynamics|symplectic structure]] on the transition and explicitly constructing a momentum-like latent from the encoder trajectory.

## Contributions

- Introduces a decoder-free JEPA world model whose latent state is a canonical pair $(q,p)$ advanced by a learned separable Hamiltonian and an exactly symplectic leapfrog step.
- Proves that each rollout step preserves phase-space volume and is invertible, excluding uniform contraction, attracting fixed points, and state merging at any horizon.
- Uses fixed Savitzky-Golay differentiation to derive the momentum-like component from position-like embeddings without learned parameters.
- Demonstrates inference at unseen sub-frame step sizes, numerical time reversal, and compute-aware model-predictive control on conservative and actuated visual pendulums.

## Method

An image encoder produces a 32-dimensional position-like embedding $q_t$. At the rollout anchor, a four-frame causal Savitzky-Golay stencil estimates $p_t$; five-frame centered stencils produce training targets but are never fed into the predictor. The 64-dimensional state $(q_t,p_t)$ is advanced using the separable, action-conditioned Hamiltonian

$$
H_\phi(q,p,u)=K_{\phi_1}(S^{-1}p)+V_{\phi_2}(q,u),
$$

where $K$ and $V$ are three-layer tanh MLPs and $S$ is a learned diagonal scale. A kick-drift-kick leapfrog update is exactly symplectic because it composes symplectic shear maps. Training unrolls eight self-fed steps and minimizes position and momentum prediction losses plus SIGReg on encoder embeddings.

The guarantee concerns geometry rather than accuracy: volume preservation permits stretching and shearing, does not bound rollout error, and does not replace encoder regularization. The learned Hamiltonian is a prior on latent evolution, not an estimate of the physical system's true energy.

## Experiments

Experiments use 64-by-64 RGB videos of conservative and torque-actuated pendulums. Episodes vary in rod length; actuated episodes also vary in bob mass. LeHami is compared with LeWorldModel (LeWM), whose action-conditioned transformer predicts from three recent latents. Frozen ridge, 25-nearest-neighbor, and MLP probes measure angle and angular velocity, while CEM-based model-predictive control evaluates position and velocity goals under a 15-TFLOP budget.

On the conservative pendulum, the cumulative normalized log-determinant remains exactly zero for LeHami while declining approximately linearly for LeWM. LeHami's velocity error is reported as 2.8 times lower over the first ten rollout steps and 1.3 times lower at the final horizon; its angle prediction becomes better after roughly 11 steps. Subdividing the trained 0.1-second step preserves the predicted trajectory, whereas doubling the step leaves the explicit integrator's stable regime. Forward-then-backward integration also produces very small numerical round-trip error, although the parsed manuscript garbles its exponent.

At the actuated-pendulum anchor, a 25-NN probe gives LeHami angular-velocity MAE $0.419 \pm 0.045$ rad/s and $R^2=0.889 \pm 0.024$, versus LeWM's $2.508 \pm 0.002$ and $R^2=-0.103 \pm 0.001$. The trade-off reverses for angle MAE: $0.068 \pm 0.018$ rad for LeHami versus $0.011 \pm 0.000$ for LeWM.

Planning does not show uniform dominance. For velocity-only goals, success is $0.527 \pm 0.019$ for LeHami, $0.473 \pm 0.014$ for tied-window LeWM, and $0.800 \pm 0.058$ for untied-window LeWM. For joint position-and-velocity goals the corresponding rates are $0.304 \pm 0.088$, $0.400 \pm 0.037$, and $0.636 \pm 0.025$. LeHami uses fewer predictor parameters and can replan more often, but its weaker positional goal reaching limits joint success.

## Limitations

- Exact volume preservation excludes specific collapse modes but does not guarantee accurate, bounded, or stable prediction error.
- The experiments cover only volume-preserving pendulum systems. Strongly dissipative dynamics require a port-Hamiltonian or other contraction-aware extension.
- Defining $p$ as the derivative of $q$ effectively fixes unit mass in learned coordinates and becomes misspecified when the mass matrix depends on configuration.
- The fixed differentiation stencil introduces estimation bias and constrains the representation; the paper proposes learning the momentum-like embedding as future work.
- LeHami allocates half of the fixed latent width to each of $q$ and $p$, which may contribute to its worse angle prediction.
- The strongest untied temporal baseline outperforms LeHami on all three reported planning clauses, despite higher per-solve compute.

## Related Concepts

- [[concepts/symplectic-latent-dynamics|Symplectic Latent Dynamics]]: constrains learned transitions to preserve the canonical symplectic form and phase-space volume.
- [[concepts/joint-embedding-predictive-architectures|Joint-Embedding Predictive Architectures]]: supplies the decoder-free latent prediction framework in which LeHami replaces the predictor.
- [[concepts/world-models|World Models]]: use learned action-conditioned dynamics for prediction and planning.
- [[concepts/latent-vector-fields|Latent Vector Fields]]: provides a broader view of iterated latent maps, fixed points, and contraction.

## Related Papers

- [[papers/flow-jepa-robust-latent-dynamics-for-jepa-world-models-via-flow-matching|Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching]] replaces recursive one-step prediction with a trajectory-level conditional flow rather than imposing symplectic structure.
- Maes et al. (2026), "LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels," provides the autoregressive baseline and training framework.
- Greydanus, Dzamba, and Yosinski (2019), "Hamiltonian Neural Networks," learns Hamiltonian dynamics as a physical surrogate, whereas LeHami uses Hamiltonian structure as a latent-space prior.
- Zoabi, Ali, and Wolf (2026), "Hamiltonian JEPA: Action-Conditioned World Models with an Inherited Control State," uses a dissipative port-Hamiltonian predictor with explicit Euler integration rather than an exactly symplectic step.

Source: supplied parsed manuscript, Cognitio job `50c5235a-1a10-49c0-bef1-042d5f00f5de`.

[[index|Library home]]
