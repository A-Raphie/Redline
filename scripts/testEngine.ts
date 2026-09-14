import { SAMPLE_CONTRACTS } from '../src/lib/standards/sampleContracts';
import { auditContract } from '../src/lib/engine/riskAuditor';
import { exportTrackedDocx } from '../src/lib/docx/docxExporter';

async function main() {
  console.log('Testing Redline Audit Engine and DOCX Exporter...');

  for (const sample of SAMPLE_CONTRACTS) {
    const standard = sample.type === 'MUTUAL_NDA' ? 'MUTUAL_NDA' : 'SAAS_CSA';
    const report = auditContract(sample.title, sample.text, standard);

    console.log(`\nDocument: ${sample.title}`);
    console.log(`Grade: ${report.grade} | Score: ${report.overallScore}/100`);
    console.log(`Clauses: ${report.totalClauses} total, ${report.flaggedClauses} flagged`);

    // Test DOCX export
    const blob = await exportTrackedDocx(report.contractTitle, report.clauses, report.benchmarkStandard);
    console.log(`Generated DOCX Blob: size = ${blob.size} bytes`);
    if (blob.size < 5000) {
      throw new Error(`Generated DOCX too small: ${blob.size} bytes`);
    }
  }

  console.log('\nAll 3 benchmark contracts audited and exported to DOCX successfully!');
}

main().catch((err) => {
  console.error('Engine test failed:', err);
  process.exit(1);
});
