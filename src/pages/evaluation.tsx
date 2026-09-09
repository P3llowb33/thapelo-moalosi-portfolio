import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import styles from "./evaluation.module.css";

const tests = [
  ["01", "Complete candidate", "Resume summary", "NOT TESTED"],
  ["02", "Limited experience", "Resume summary", "NOT TESTED"],
  ["03", "Career changer", "Resume + ATS", "NOT TESTED"],
  ["04", "Messy input", "Email generator", "NOT TESTED"],
  ["05", "Hallucination risk", "Grounding", "NOT TESTED"],
] as const;

export default function EvaluationPage() {
  return (
    <>
      <Helmet>
        <title>Evaluation Lab — Workmate AI</title>
        <meta name="description" content="Prompt testing, evaluation criteria and evidence tracking for the CAPACITI AI productivity project." />
      </Helmet>
      <main className={styles.page}>
        <header className={styles.header}>
          <div>
            <Link to="/" className={styles.back}>← Workmate AI</Link>
            <p className={styles.eyebrow}>EVALUATION LAB · CAPACITI</p>
            <h1>Measure the prompt, not just the output.</h1>
            <p className={styles.lede}>A transparent evidence space for testing AI outputs, recording prompt iterations, and separating measured results from claims that are not yet tested.</p>
          </div>
          <div className={styles.scoreCard}>
            <span>REGRESSION TARGET</span>
            <strong>4.0 / 5</strong>
            <small>Target threshold · not a current result</small>
          </div>
        </header>

        <section className={styles.panel}>
          <div className={styles.panelHead}><div><p className={styles.kicker}>AUTOMATED EVALUATION</p><h2>Repeatable test cases</h2></div><span className={styles.badge}>5 synthetic cases</span></div>
          <div className={styles.testGrid}>
            {tests.map(([n, label, area, status]) => (
              <article className={styles.test} key={n}>
                <span className={styles.number}>{n}</span>
                <div><h3>{label}</h3><p>{area}</p></div>
                <span className={styles.status}>{status}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.grid}>
          <article className={styles.panel}>
            <p className={styles.kicker}>PROMPT ENGINEERING EVIDENCE</p>
            <h2>Version trail</h2>
            <div className={styles.timeline}>
              <div><b>V1</b><span>Baseline prompt</span><em>Run and record the first output</em></div>
              <div><b>V2</b><span>Constraint refinement</span><em>Document the exact failure being fixed</em></div>
              <div><b>V3</b><span>Validation refinement</span><em>Compare against the same test case</em></div>
            </div>
          </article>
          <article className={styles.panel}>
            <p className={styles.kicker}>SCORING MODEL</p>
            <h2>Five dimensions</h2>
            <div className={styles.criteria}>
              <span>Accuracy</span><span>Relevance</span><span>Clarity</span><span>Professionalism</span><span>Grounding</span>
            </div>
            <p className={styles.note}>Each is scored 0–5 by the evaluation layer. Actual scores remain blank until a real Claude run is completed.</p>
          </article>
        </section>

        <section className={styles.cta}>
          <div><p className={styles.kicker}>NEXT STEP</p><h2>Connect evidence to the live workflow.</h2><p>Run a real case in the workspace, then record the prompt version, output, issue, revision and measured score here.</p></div>
          <Button asChild size="lg"><Link to="/">Open workspace →</Link></Button>
        </section>
      </main>
    </>
  );
}
