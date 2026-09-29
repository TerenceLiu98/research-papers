---
title: "Bureaucratic beliefs and law enforcement"
type: paper
authors:
  - Fuhai Hong
  - Dong Zhang
year: 2022
tags:
  - political-economy
  - bureaucracy
  - law-enforcement
  - signaling-games
---

## TL;DR

Rulers' pursuit of private benefits can weaken law enforcement by changing bureaucrats' beliefs about whether shirking will be punished. Hong and Zhang model this mechanism as a signaling game between a privately informed ruler, a bureaucrat, and two civilians. A unique separating equilibrium exists under specified parameter restrictions, but pooling equilibria also allow discretion and effective enforcement to coexist. Historical discussions illustrate the mechanism without causally testing it.

## Research Question

How does a ruler's observable exercise of discretion affect bureaucrats' expectations of investigation, their enforcement decisions, and civilians' incentives to produce rather than fight?

## Motivation

Formal laws can exist without effective implementation. Standard delegation models often assume a welfare-maximizing principal; this paper instead makes the ruler's concern for social welfare private information. It isolates an informational cost of pursuing private gains, beyond any direct predation: officials may infer that the ruler will tolerate non-enforcement.

## Contributions

- Integrates ruler behavior, bureaucratic enforcement, and civilian interaction in one sequential game with incomplete information.
- Derives an enforcement threshold that connects beliefs about the ruler to the cost of enforcement and the value of remaining in office.
- Characterizes separating and pooling perfect Bayesian equilibria and examines which survive the intuitive criterion.
- Uses personalist and developmental states, plus leadership change in Hungary, to illustrate the proposed mechanism (Section 5).

## Method

### Players and Incentives

Two civilians interact for two rounds. Without enforcement, they face a prisoners' dilemma with payoffs ordered $c>a>d>b$, and fighting is dominant. Enforcement imposes a penalty $f>\max\{c-a,d-b\}$ on fighting, making production dominant. The gain in each civilian's equilibrium payoff is $a-d$.

The bureaucrat pays enforcement cost $E>0$, including forgone opportunities for bribes or other benefits. Investigation after non-enforcement removes the bureaucrat, who loses wages and other office benefits worth $W>E$. Investigation costs the ruler $C>0$ and enables direct enforcement in the second round.

The ruler can take an observable discretionary action $D$ yielding private benefit $B>0$. By assumption, this action has no direct effect on civilian welfare. The ruler weights total civilian payoffs by $\alpha/2$, with privately known type $\alpha\in\{\alpha_H,\alpha_L\}$ and prior probability $p$ of the high type. The crucial restriction is

$$
\alpha_H(a-d)>C>\alpha_L(a-d).
$$

Thus only the high type finds investigation worthwhile after observing fighting. Neither type investigates after production (Lemma 1).

### Timing and Beliefs

Nature chooses the ruler's type; the ruler chooses discretion or restraint; the bureaucrat decides whether to enforce; civilians play the first round; the ruler decides whether to investigate; civilians play again. The authors solve for pure-strategy perfect Bayesian equilibria by backward induction.

Let $\mu$ be the bureaucrat's posterior probability of the high type after observing the ruler's action. Enforcement gives payoff $-E$, while shirking gives $-\mu W$. With enforcement chosen at indifference,

$$
\text{enforce}\quad\Longleftrightarrow\quad\mu\ge E/W.
$$

This is the link between leadership signals and [[concepts/bureaucratic-beliefs|Bureaucratic Beliefs]].

## Experiments

The paper reports analytical results and historical illustrations, with no experiment, statistical estimation, or direct measurement of bureaucratic beliefs.

### Equilibrium Results

| Result | Conditions | Outcome |
| --- | --- | --- |
| Separation, Proposition 1 | $(B-C)/\alpha_H\le a-d\le B/(2\alpha_L)$, alongside the maintained assumptions | High type forgoes discretion; low type exercises it. The bureaucrat enforces only after restraint. Production occurs in both rounds under the high type, fighting in both under the low type; neither investigates on the equilibrium path. |
| Pooling on discretion with enforcement, Proposition 2(a) | $p\ge E/W$ | Both types obtain private benefits and the bureaucrat enforces; both civilian rounds yield production. Any off-path belief after restraint is compatible with this equilibrium. |
| Pooling on discretion without initial enforcement, Proposition 2(b) | $p<E/W$ and either $a-d\le\min\{(B-C)/\alpha_H,B/(2\alpha_L)\}$ or the off-path belief satisfies $\mu(\varnothing)<E/W$ | The bureaucrat shirks and first-round fighting occurs. The high type investigates and restores production in round two; the low type does not. |
| Pooling on restraint, Proposition 3 | $p\ge E/W$, $a-d\ge\max\{(B-C)/\alpha_H,B/(2\alpha_L)\}$, and $\mu(D)<E/W$ | Both types forgo private benefits, the bureaucrat enforces, and production occurs in both rounds. |

The reverse separating pattern cannot be sustained: a low type who abstained from discretion would gain by mimicking a high type who exercised it (Appendix 1). Uniqueness refers to the separating equilibrium, not to the game's entire equilibrium set.

The intuitive criterion eliminates pessimistic-belief pooling on discretion when $p<E/W$ and $(B-C)/\alpha_H<a-d<B/(2\alpha_L)$. Separation and the other identified pooling equilibria survive (Section 4.3; Appendix 3). In pooling equilibria, lower $E$ or higher $W$ lowers the belief threshold for bureaucratic enforcement. Lack of initial bureaucratic enforcement does not imply lack of later intervention by a high-type ruler.

### Historical Illustrations

Section 5 interprets Mobutu's Zaire as consistent with private-benefit seeking and weak enforcement; Singapore and Taiwan illustrate leadership restraint and bureaucratic incentives. The discussion of Hungary describes changes following Orban's accession in 2010 using literature available to the authors. These are retrospective illustrations, not estimates of the signaling mechanism or a current assessment of those countries.

## Limitations

- The model assumes observable ruler behavior, two exogenous ruler types, binary enforcement, and a cost ordering that makes only the high type investigate. Its conclusions are conditional on these restrictions.
- Private-benefit seeking has no direct welfare cost by construction. This isolates signaling but omits the resource depletion and predation that can accompany real corruption.
- Analysis is restricted to pure strategies. Pooling and separating equilibria can coexist, and off-path beliefs matter; the refinement does not establish a globally unique outcome.
- Civilian behavior switches between dominant-strategy outcomes. Investigation detects non-enforcement and enables effective intervention, abstracting from imperfect monitoring and implementation capacity.
- Historical cases do not identify bureaucratic beliefs or distinguish the mechanism from institutional, economic, or geopolitical explanations. The pooling results also preclude a universal claim that discretion always prevents enforcement.
- Endogenous ruler selection, bureaucratic self-selection, laws serving the ruler's private interests, and alternative incentive contracts are proposed extensions rather than modeled results.

The supplied source states online publication on 21 October 2022. No DOI or other stable paper identifier is supplied in its text. Some mathematical symbols and footnotes are damaged or missing; notation above follows the propositions and their supporting derivations.

## Related Concepts

- [[concepts/bureaucratic-beliefs|Bureaucratic Beliefs]]: expectations about leadership's willingness to discipline officials mediate enforcement incentives.
- [[concepts/street-level-discretion|Street-Level Discretion]]: a related concept concerning frontline decision latitude. The ruler's private-benefit discretion in this model is a different object from officials' authorized case-specific judgment.

## Related Papers

The source cites these foundations, which do not currently have separate library pages:

- Becker and Stigler (1974), "Law enforcement, malfeasance, and compensation of enforcers": compensation and enforcement incentives.
- Cho and Kreps (1987), "Signaling games and stable equilibria": the equilibrium refinement used here.
- Acemoglu, Verdier, and Robinson (2004), "Kleptocracy and divide-and-rule: A model of personal rule": a related formal account of personal rule focused on maintaining power.
- Finan, Olken, and Pande (2017), "The personnel economics of the developing state": the bureaucratic recruitment, incentives, and monitoring literature motivating the model.

[[papers/does-ai-erode-street-level-discretion-a-mixed-methods-study-on-automated-decision-making-in-chinas-tax-authorities|Does AI erode street-level discretion? A mixed-methods study on automated decision-making in China's tax authorities]] provides a thematic library comparison on frontline administrative decision-making. It studies perceived discretion under automation, rather than ruler-type signaling, and is not a citation attributed to Hong and Zhang.

[[index|Library home]]
