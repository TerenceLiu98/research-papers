---
title: "Self-Play Pretraining with Zero Data"
type: paper
authors:
  - Aditya Cowsik
  - Kfir Dolev
  - Michael Y. Li
  - G. Bruno De Luca
  - Nourya Cohen
  - Noah D. Goodman
  - Yoav Levine
year: null
source_job_id: "f1781d04-7bf4-42a6-9706-a9af45d369c5"
tags:
  - self-play
  - synthetic-pretraining
  - universal-prediction
  - scaling-laws
  - in-context-learning
---

## TL;DR

Self-Play Pretraining with Zero Data trains a generator and a learner from random initialization. The generator proposes programs for a small universal Turing machine, and the learner predicts the resulting byte sequences. A preconditioned gradient-alignment reward favors programs that extend the learner's current capabilities. Without training on natural data, the resulting learners show predictable zero-shot loss scaling across text, images, audio, speech, music, DNA, code, and formal mathematics, along with broad in-context learning. The results support transferable universal predictive structure, but do not show that self-play replaces contingent information from the world.

## Research Question

Can an adaptive self-play curriculum discover useful training data from a universal program space, starting with no natural data, such that a learner acquires predictive structure that transfers to unseen natural modalities?

## Motivation

Large-scale pretraining still relies on human-curated data mixtures or hand-designed synthetic generators. A universal program space can represent any computable data-generating process, but most programs are not useful for a particular learner. The paper therefore asks whether a generator can learn where to spend synthetic-data compute as the learner changes, while keeping the experiment tabula rasa so that transfer cannot be attributed to natural-data updates.

## Contributions

- A self-play pretraining procedure with a program generator, a byte-level learner, and a Brainf*ck-like universal machine as the synthetic-data substrate.
- A learning-progress reward based on the absolute alignment between a program's learner gradient and the learner's recent AdamW-preconditioned parameter movement.
- A pool construction scheme combining fresh samples, local mutations, replay, and reward-weighted expert iteration to explore and retain useful programs.
- Scaling-law experiments showing predictable zero-shot improvements across diverse modalities without gradient updates on the evaluation data.
- Analyses of in-context learning, emergent mathematical sequences, epiplexity, and the use of self-play checkpoints as pre-pretraining initializations for ordinary natural-data training.

## Method

**Generator and learner.** Both models are independently initialized decoder-only Llama transformers with the same architecture and a 256-byte vocabulary. The generator emits programs; the learner is trained with next-token cross-entropy on the outputs of those programs. Programs are executed on a fixed universal machine with a byte-valued circular tape, bounded execution, and random input tape, so one program can define a distribution over output sequences.

**Adaptive reward.** At self-play round $e$, the generator receives a reward for a program whose learner gradient aligns with the learner's parameter movement over a lookback window. The score uses the diagonal AdamW step operator as a preconditioner:

$$
r_i = \left|\left\langle \nabla_\theta \mathcal{L}(y_i;\theta_e), P_e \odot (\theta_{\lfloor e/2\rfloor}-\theta_e)\right\rangle\right|.
$$

This favors data that is neither already mastered nor unrelated to the learner's current trajectory. The generator optimizes a KL-regularized policy-gradient objective, uses a GRPO-style batch advantage and off-policy importance correction, and receives an additional reward-weighted supervised objective.

**Search and retention.** Each round combines fresh generator samples, single-token mutations of positively rewarded programs, and replayed programs from earlier rounds. A MAP-Elites-style archive indexes programs by dynamic loop depth and body length. Reward decay allows newly useful programs to replace stale elites while preserving structural diversity.

## Experiments

**Zero-shot scaling.** The authors construct compute-optimal frontiers over model size, self-play checkpoints, and ensemble size, then fit $L(C)=E+AC^{-\alpha}$ separately for each dataset. Self-play produces predictable power-law decreases in bits-per-byte loss for text, CIFAR-10 image bytes, audio, MIDI melodies, DNA, Metamath, C source, and Python. The reported compute exponents are broadly comparable to published natural-data pretraining exponents, with DNA as an exception.

**Baselines and generator quality.** A fixed Solomonoff-style program prior accesses the same universal program space but scales substantially more slowly, showing that adaptivity matters. Random PCFG pretraining is competitive on text and code but transfers less consistently to images, music, audio, and speech. Later generator checkpoints have higher epiplexity and produce better held-out text, audio, and image performance, indicating that the curriculum becomes more useful over time.

**In-context learning.** Without gradient updates or task-specific fine-tuning, self-play learners improve on reverse-string, stack, associative-recall, sum, max, and min tasks as examples accumulate. The paper reports near-perfect performance on reverse string, stack, and associative recall after sufficient context, while fixed universal-prior and PCFG baselines do not learn all of the tasks. On the sum task, qualitative analysis shows a progression from copying and marginal predictions to partial and then more reliable arithmetic strategies.

**Emergent structure.** In saved checkpoints, the generator discovers arithmetic sequences at round 0, geometric sequences by round 256, and Fibonacci-like, quadratic, and cubic sequences by round 512. Uniform sampling of $1.64\times10^8$ programs found arithmetic sequences at an expected first-discovery round of about 105 but no matches for the other four families, giving a common lower bound above 53,000 rounds at the stated sampling rate. Because self-play programs were checked only every 256 rounds, these comparisons are conservative and do not identify relative frequencies among the rare families.

**Pre-pretraining.** Initializing a 24.4M-parameter model from a final self-play checkpoint accelerates later natural-data training on DCLM text, CIFAR-10, and ESC-50 audio. In the reported protocol, convergence required 320M versus 496M tokens on ESC-50 and 421M versus 588M on CIFAR-10 for warm-start versus random initialization. The advantage narrows by the end of training, so the clearest evidence is faster acquisition rather than a permanently lower final loss.

## Limitations

- The experiments use models below 25M parameters with a 4K context. Whether the method scales to larger models or more expressive program languages is unresolved.
- Hyperparameters are selected partly using DCLM and DNA validation loss. These datasets receive no gradient updates, but the selection procedure still introduces limited evaluation leakage.
- The universal machine, byte interface, augmented Brainf*ck primitives, and benchmark encodings are designed choices. The setting has no natural data, but it is not free of inductive bias or engineering.
- The experiments show association between self-play, discovered mathematical structure, and transfer. They do not establish that the identified sequence families causally drive the scaling results.
- Self-play compute, program search, and forward-mode gradient calculations may be expensive. The paper does not provide a comparison that amortizes this cost against all relevant natural-data alternatives.
- Universal pretraining cannot supply contingent facts about a particular world or dataset. The paper frames self-play as a complement to natural-data pretraining, not a replacement.

## Related Concepts

- [[concepts/self-play-pretraining|Self-Play Pretraining]]
- [[concepts/universal-prediction|Universal Prediction]]
- [[concepts/learning-progress-rewards|Learning-Progress Rewards]]
- [[concepts/meta-evolution|Meta-Evolution]]: the generator is updated from experience produced by the search process.
- [[concepts/continual-learning|Continual Learning]]: replay and reward decay are used to mitigate forgetting in the evolving generator.
- [[concepts/knowledge-distillation|Knowledge Distillation]]: reward-weighted expert iteration transfers selected program behavior back into the generator, although it is not standard teacher-student distillation.

## Related Papers

**Works cited by the source:**

- Solomonoff (1964), "A Formal Theory of Inductive Inference": the description-length prior and theoretical inspiration for universal prediction.
- Grau-Moya et al. (2024), "Learning Universal Predictors": amortized prediction over outputs of programs sampled from a universal Turing machine.
- Bloem (2025), "Universal Pre-training by Iterated Random Computation": zero-natural-data pretraining with iterated random computation.
- Poesia et al. (2024), "Learning Formal Mathematics from Intrinsic Motivation": self-play and intrinsic motivation for formal mathematical learning.
- Finzi et al. (2026), "From Entropy to Epiplexity": the compute-bounded structure measure used to evaluate generated corpora.

**Library comparisons:**

- [[papers/a-decoder-only-foundation-model-for-time-series-forecasting|A Decoder-Only Foundation Model for Time Series Forecasting]] also studies transfer from synthetic data, but uses a hand-designed mixture of real and synthetic time series rather than learning a universal data-generating distribution.

[[index|Library home]]
