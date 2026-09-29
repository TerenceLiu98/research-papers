---
title: Efficiently Computing Approximate Nash Equilibria in Multi-Adversarial Team Games
type: paper
authors:
  - Prasanna Maddila
  - "R\u00e9gis Sabbadin"
  - Meritxell Vinyals
year: 2026
venue: AAMAS 2026
doi: 10.65109/TBAX6220
tags:
  - algorithmic-game-theory
  - adversarial-team-games
  - nash-equilibrium
  - approximation-algorithms
---

## TL;DR

The paper extends adversarial team games from one adversary to multiple adversaries whose payoffs depend on the team's actions and their own action, but not on other adversaries' actions. Under a polynomial expectation assumption, MATG-GDM computes an additive approximate Nash equilibrium in polynomial time in the game's natural parameters and inverse error tolerance. Random-game experiments show better completion rates than the tested general solvers as the number of adversaries grows, although IPA is much faster and more accurate on instances it solves.

## Research Question

Can the polynomial-time approximation guarantee for Nash equilibrium in single-adversary team games extend to multiple independent adversaries without enumerating their joint action space?

## Motivation

A team may share an objective while its members randomize independently because they cannot coordinate their actions. Multiple opponents arise in security and planning applications, but treating all opponents as a single player creates an exponentially large joint action set. [[concepts/multi-adversarial-team-games|Multi-Adversarial Team Games]] exploit a specific payoff decomposition to avoid that expansion. The target is unilateral stability, not the team-optimal equilibrium or a globally optimal team policy.

## Contributions

- Defines normal-form MATGs with independent adversary payoffs and a shared team payoff equal to their negative sum.
- Extends Gradient Descent Max to MATG-GDM, combining individual adversary best responses, projected team gradient updates, and a compact linear program for adversary mixed strategies.
- Proves an FPTAS under the Polynomial Expectation Property (Assumption 1 and Theorem 3), using a correlated-adversary transformation and a Moreau-envelope argument.
- Discusses implications for the restricted class of two-team games whose utility factorizes additively over maximizers (Section 5).
- Evaluates the method against IPA and Wilson and studies random games with up to four teammates and nine adversaries.

## Method

For team actions $\mathbf a$ and adversary actions $\mathbf b$, each adversary $j$ maximizes $U_j(\mathbf a,b_j)\in[0,1]$. Every teammate receives the same payoff

$$
U_{\mathrm{team}}(\mathbf a,\mathbf b)=-\sum_{j=1}^{m}U_j(\mathbf a,b_j).
$$

The zero-sum relation is between the shared team payoff and the sum of adversary payoffs; it does not sum one copy of the shared payoff for every teammate. Both teammates and adversaries use individual mixed strategies. An [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]] has maximum unilateral improvement, or NE-GAP, at most $\varepsilon$.

Each MATG-GDM iteration performs four operations:

1. Find each adversary's pure best response to the current team strategy.
2. Update each teammate by projected gradient descent on the sum of adversary utilities, projecting onto that teammate's probability simplex.
3. Run `ExtendNE`, a linear program over individual adversary probabilities and one auxiliary variable per teammate. It maximizes the sum of auxiliary lower bounds on adversary utility against each teammate's pure deviations.
4. Check the resulting profile's NE-GAP and stop when it is at most $\varepsilon$.

The linear program has $\sum_j|\mathcal B_j|+n$ variables, avoiding a distribution explicitly represented over $\prod_j\mathcal B_j$. Its output is checked for equilibrium; an arbitrary iteration need not already be an approximate equilibrium.

The proof first allows adversaries to act as one correlated macro-adversary with summed utility. Additivity makes expected utility depend only on individual adversary marginals. Consequently, marginalizing an $\varepsilon$-equilibrium of the transformed game gives an $\varepsilon$-equilibrium of the original MATG (Theorem 7). Independent best-response calculations and the compact LP implement the relevant transformed-game operations without constructing the joint action space. Bounds on smoothness and the Moreau envelope use the original game's parameters.

Theorem 3 states a bound of $\operatorname{poly}(\Gamma)/\varepsilon^4$ iterations with an appropriately chosen learning rate $\eta=\Theta(\varepsilon^2)$. Polynomial work per iteration additionally requires exact expected utilities to be computable in polynomial time for mixed profiles (Assumption 1). The result does not make arbitrary exponentially represented payoff tables cheap to evaluate.

## Experiments

Section 6 samples adversary payoffs independently and uniformly from $[0,1]$, using ten independent instances per configuration. The notation $nv m/a$, written without spaces below, means $n$ teammates, $m$ adversaries, and $a$ actions per player. The Python 3.11 implementation uses JAX and Optax; experiments run on an Intel i7-12700 machine with 64 GB RAM.

Table 3 compares IPA in Gambit, the exact Wilson solver in GT-Nash, and MATG-GDM under a 30-minute timeout. Across all nine configurations with two teammates, MATG-GDM completes 10/10 instances at both tested settings. Selected rows are:

| Game | IPA solved | Wilson solved | MATG-GDM seconds, error $10^{-3}$ | MATG-GDM seconds, error $10^{-4}$ |
| --- | ---: | ---: | ---: | ---: |
| 2v1/6 | 10/10 | 5/10 | $6.91\pm1.33$ | $78.42\pm59.35$ |
| 2v3/6 | 8/10 | 0/10 | $12.57\pm4.54$ | $175.86\pm113.80$ |
| 2v6/6 | 0/10 | 0/10 | $15.08\pm5.66$ | $172.04\pm110.43$ |

Times are means and standard deviations over solved instances. The two MATG-GDM columns use learning rates $10^{-2}$ and $10^{-3}$, respectively. IPA achieves gaps around $10^{-7}$ on solved cases and is faster than MATG-GDM there, so these comparisons trade precision and coverage as well as runtime. The paper reports that representing a 3v6/6 game in full normal form takes approximately 1 GB versus 52 KB in its MATG representation.

The scalability study uses four teammates, six actions each, and one, three, six, or nine adversaries, with a 100,000-iteration budget. It tracks the best gap seen so far, $\mathrm{CNE\text{-}GAP}(t)=\min_{s\le t}\mathrm{NE\text{-}GAP}(s)$, rather than claiming that every iterate improves. At learning rate $10^{-3}$, Table 4 reports $63{,}504\pm16{,}292$ iterations to error $10^{-4}$ for 4v1/6 and $23{,}268\pm13{,}545$ for 4v9/6. The authors report reaching this tolerance on all tested instances. They hypothesize that summed gradients explain fewer iterations with more adversaries; this is an explanation proposed by the authors, not an established scaling law.

## Limitations

- The guarantee relies on payoff independence across adversaries, additive team loss, and polynomial-time exact expectation evaluation. It does not cover arbitrary two-team games.
- Approximate Nash equilibrium bounds individual incentives to deviate. It does not certify the best team payoff, joint team stability, or a global minimax optimum.
- Evaluation uses synthetic random normal-form games. The motivating security and planning applications are not evaluated, and multi-adversary Markov extensions remain future work.
- Larger fixed learning rates can oscillate near equilibrium; the empirical step sizes should not be identified with the theorem's sufficient choice without its parameter-dependent constants.
- Some Table 4 standard deviations at learning rate $10^{-2}$ are difficult to reconcile with nonnegative termination iterations capped at 100,000 and the reported means. The supplied text does not explain censoring or aggregation sufficiently to resolve this. The all-instance convergence statement is retained as an author report.
- The supplied Markdown has damaged symbols and refers to appendices that are not included. The summary follows legible definitions, theorem statements, tables, and prose; it does not independently verify the missing proofs or infer numerical values from plot images.

## Related Concepts

- [[concepts/multi-adversarial-team-games|Multi-Adversarial Team Games]]: the payoff structure that enables compact adversary calculations.
- [[concepts/approximate-nash-equilibrium|Approximate Nash Equilibrium]]: additive unilateral-deviation guarantee and NE-GAP evaluation.

## Related Papers

- Anagnostides et al. (2023), "Algorithms and Complexity for Computing Nash Equilibria in Adversarial Team Games": the single-adversary GDM algorithm and proof framework extended here (reference [1]).
- Hollender, Maystre, and Nagarajan (2025), "The Complexity of Two-Team Polymatrix Games with Independent Adversaries": related complexity results in a pairwise-utility setting (reference [15]).
- Kalogiannis et al. (2023), "Efficiently Computing Nash Equilibria in Adversarial Team Markov Games": a sequential setting motivating future extensions (reference [16]).
- Govindan and Wilson (2004), "Computing Nash equilibria by iterated polymatrix approximation": the IPA comparison method (reference [12]).

[[index|Library home]]
