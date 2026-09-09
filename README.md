# Workmate AI — CAPACITI AI Productivity Assistant

An assessment-ready AI-powered workplace productivity assistant built in Floot for the CAPACITI AI Development programme.

## Core product

Workmate AI combines four workplace workflows:

- Resume & Career Assistant
- Smart Email Generator
- AI Research Assistant
- AI Workplace Chat

The Resume & Career workflow is the product's differentiator. It uses grounded candidate information and a supplied job description to generate a professional summary, analyze ATS-relevant terminology, evaluate the result, and revise low-scoring output.

## AI workflow

`User input → Claude generation → AI evaluation → revision when needed → final result → human review`

The workflow allows up to two revision passes and does not treat missing job-description keywords as proof that the candidate has those skills.

## CAPACITI alignment

| Criterion | Weight | Evidence in product |
| --- | ---: | --- |
| Problem Relevance | 20% | Workplace automation and career productivity use cases |
| Prompt Engineering | 25% | Structured prompts, validation, evaluation and iteration model |
| Functionality | 25% | Four interactive AI productivity workflows |
| Innovation | 15% | Grounded ATS analysis, self-critique, revision and evaluation |
| Responsible AI | 10% | Grounding, human review, privacy and prompt-injection awareness |
| Presentation | 5% | Evaluator-facing workspace and Evaluation Lab |

## Technology

- Floot application platform
- React + TypeScript
- Claude / Anthropic API
- Postgres via Floot
- Floot authentication
- Responsive CSS modules

## Repository scope

This repository contains the application-authored source used to implement the prototype and the project documentation. Floot-provided platform components and generated infrastructure are intentionally not duplicated here unless they were authored specifically for this application.

## Responsible AI rules

The application must not invent qualifications, employers, dates, achievements, certifications, skills, sources, statistics or test results. AI output is a draft and requires human review before professional use.

## Current testing note

Live Claude generation depends on the connected Anthropic API account having available API credits. Test scores and productivity claims are only considered valid after an actual run and are not fabricated in this repository.

## Live application

The prototype is hosted by Floot. See the live application link provided with the project submission.
