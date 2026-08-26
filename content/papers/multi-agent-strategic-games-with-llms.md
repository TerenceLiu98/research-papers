---
title: "Multi-Agent Strategic Games with LLMs"
type: paper
authors:
  - Maxim Chupilkin
year: null
tags:
  - llm-agents
  - strategic-experiments
  - security-dilemma
  - international-conflict
  - repeated-games
---

## TL;DR

This paper uses [[LLM-Based Strategic Experimentation|LLM-based strategic experiments]] to test how model agents respond to a repeated security dilemma. Across 320 games involving GPT-5, GPT-5 Mini, Sonnet, and Gemini, conflict rises from 65% in the baseline to 81.3% with a third agent and 100% with a known finite horizon, but falls to 42.5% when agents can communicate. Private reasoning and public messages track the expected mechanisms, although the artificial agents and deliberately simple game do not support direct claims about human or state behavior.

## Research Question

Can LLM agents serve as controlled experimental subjects for studying conflict and cooperation, and do their choices and generated reasoning respond coherently to multipolarity, known finite horizons, and public communication?

## Motivation

Theoretical work in international relations connects conflict to polarity, strategic uncertainty, time horizons, and communication, but real-world cases change along many dimensions at once. Human-subject experiments offer more control but are costly to scale and rarely expose the reasoning immediately preceding each decision. The paper studies whether LLM agents can complement those methods by producing repeatable strategic interactions with observable choices, private justifications, and public messages.

## Contributions

- Implements a repeated security dilemma in which independently acting LLM agents choose between attack and restraint under controlled treatment changes.
- Compares a dyadic unknown-horizon baseline with multipolar, known finite-horizon, and public-communication conditions.
- Links behavioral outcomes to text generated immediately before decisions and, in the communication treatment, to a shared public message history.
- Shows stable treatment ordering across four model families, leave-one-model-out checks, and a model-fixed-effects specification.
- Frames [[LLM-Based Strategic Experimentation]] as a scalable method for probing mechanisms while explicitly limiting claims about external validity.

## Method

The baseline is a two-agent repeated game with a coded maximum of 10 periods that is not disclosed to the agents. In each period, both agents independently choose `ATTACK` or `DO_NOTHING`; any attack ends the game. Ordinal outcomes rank unilateral attack first, mutual restraint second, mutual attack third, and unilateral restraint against an attacker last. Each agent receives its own previous actions, messages, and reasoning, but does not see the other agent's private reasoning or messages in treatments without communication.

Three treatments alter one feature at a time. The multipolar treatment adds a third agent. The finite-period treatment tells the two agents that the game has exactly 10 periods. The communication treatment retains the dyadic unknown horizon but exposes both agents to a cumulative public message log. Messages are nonbinding and do not change payoffs or termination.

GPT-5, GPT-5 Mini, Sonnet, and Gemini each play 20 games in every condition, producing 80 games per treatment and 320 total. Game-level measures record whether war occurs, its first period, and whether the terminal attack is unilateral or simultaneous. The analysis also classifies private reasoning into strategic logics and public messages into rhetorical styles using transparent phrase-based coding rules.

## Experiments

War occurs in 52 of 80 baseline games (65%), 65 of 80 multipolar games (81.3%), all 80 finite-period games, and 34 of 80 communication games (42.5%). The treatment ordering holds within every model despite large baseline differences: overall war rates range from 32.5% for Sonnet to 96.3% for GPT-5. Leave-one-model-out estimates preserve the same ordering. In a linear probability model with model fixed effects, multipolarity raises war by 16.3 percentage points (robust SE 4.7), a known finite horizon raises it by 35 points (SE 4.5), and communication lowers it by 22.5 points (SE 5.8), relative to baseline.

Conflict is mostly front-loaded. Of 52 baseline wars, 51 begin in period 1; 33 of 34 communication wars also begin immediately. Multipolarity and finite horizons allow somewhat more delayed conflict, with means of 0.48 and 1.70 peaceful periods before war, respectively, but period 1 remains modal. The known endpoint therefore tends to pull conflict forward through unraveling rather than merely produce last-period defection.

The form of conflict also changes. Simultaneous attacks account for 51.9% of baseline wars, 65% of finite-horizon wars, and 78.5% of multipolar wars. In the three-agent condition, 33 wars involve all three agents attacking together. Communication shifts the remaining conflict toward one-sided breakdown: 27 of its 34 wars (79.4%) are unilateral.

Generated reasoning is consistent with these behavioral shifts. Baseline entries divide between precautionary first strikes and cooperation under an unknown horizon. Multipolarity makes vulnerability and preemption more salient, while finite horizons elicit explicit backward-induction arguments. Communication increases references to reciprocity, credibility, trust, and informal rules. Public rhetoric differs by model: GPT-5 often proposes procedures or states preemptive logic, Sonnet emphasizes relational trust, and Gemini emphasizes collective gains.

## Limitations

LLM agents are not people, governments, or states. Their behavior depends on training data, model architecture, system instructions, prompts, and output constraints, so the results probe strategic mechanisms within this artificial environment rather than predict real-world conflict. The game also omits asymmetric information, changing capabilities, coalitions, domestic constraints, costly signals, institutions, and many other features of international politics.

The evidence does not test prompt variants, and the authors argue only for stability under the maintained design. Each model-treatment cell contains 20 games, and model versions, provider behavior, or decoding infrastructure may affect replication. Finally, generated reasoning is an instructed explanation, not transparent access to cognition. Its phrase-based classification could be strengthened with blinded human coding, supervised methods, or embedding-based measures.

## Related Concepts

- [[LLM-Based Strategic Experimentation]]
- Repeated games
- Security dilemma
- Backward induction
- Multipolarity
- Cheap talk
- Agent-based simulation

## Related Papers

- Akata et al. (2025), ["Playing Repeated Games with Large Language Models"](https://doi.org/10.1038/s41562-025-02172-y).
- Rivera et al. (2024), ["Escalation Risks from Language Models in Military and Diplomatic Decision-Making"](https://doi.org/10.1145/3630106.3658942).
- Lamparth et al. (2024), "Human vs. Machine: Behavioral Differences Between Expert Humans and Language Models in Wargame Simulations."
- Tingley and Walter (2011), "Can Cheap Talk Deter? An Experimental Analysis."
- Kreps et al. (1982), "Rational Cooperation in the Finitely Repeated Prisoners' Dilemma."

[[index|Library home]]
