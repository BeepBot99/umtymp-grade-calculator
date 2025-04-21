<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import type {
		ExamData,
		ParticipationData,
		WebworkScore,
		WinterSummerAssignmentScore,
		WrittenHomeworkScore
	} from '$lib';

	let fieldset: HTMLFieldSetElement = $state() as HTMLFieldSetElement;

	let exams: ExamData = JSON.parse(sessionStorage.getItem('exams')!!) as ExamData;
	let participation: ParticipationData = JSON.parse(
		sessionStorage.getItem('participation')!!
	) as ParticipationData;
	let written: WrittenHomeworkScore[] = JSON.parse(
		sessionStorage.getItem('written')!!
	) as WrittenHomeworkScore[];
	let webwork: WebworkScore[] = JSON.parse(sessionStorage.getItem('webwork')!!) as WebworkScore[];
	let allWebwork: boolean = sessionStorage.getItem('allWebwork') === 'true';
	let summerWinter: WinterSummerAssignmentScore = JSON.parse(
		sessionStorage.getItem('summerWinter')!!
	) as WinterSummerAssignmentScore;

	onMount(() => {
		gsap.from(fieldset, {
			y: -50,
			duration: 0.5,
			ease: 'power2.out'
		});
	});

	function formatDecimal(num: number): string {
		return (+(num * 100).toFixed(2)).toString();
	}

	function calculateWrittenGrade(
		scores: WrittenHomeworkScore[],
		gatewayAttempts: number,
		summerWinter: WinterSummerAssignmentScore
	) {
		return (
			scores.reduce(
				(acc, score) => acc + score.score * (score.late ? 0.75 : 1),
				25 - (gatewayAttempts - 1) * 5
			) /
			(25 + 20 * scores.filter((score) => score.score !== null).length)
		);
	}

	function calculateWebworkGrade(scores: WebworkScore[], allWebwork: boolean) {
		if (allWebwork) return 1;
		const score =
			scores.reduce((acc, score) => acc + score.score, 0) /
			scores.reduce((acc, score) => acc + score.total, 0);
		return isNaN(score) ? 1 : score;
	}

	function calculateParticipationGrade(participation: ParticipationData) {
		return (
			(participation.participationGrade + participation.tdqs * 2) /
			(100 + participation.totalTdqs * 2)
		);
	}

	function calculateExamGrade(exams: ExamData) {
		const score =
			(exams.exam1 + exams.exam2 + exams.exam3) /
			((exams.exam2 === null ? 0 : 100) +
				(exams.exam3 === null ? 0 : 100) +
				(exams.exam1 === null ? 0 : exams.exam1Quiz ? 50 : 100));
		return isNaN(score) ? 0 : score;
	}

	function calculateTotalGrade(
		webworkGrade: number,
		writtenGrade: number,
		participationGrade: number,
		examGrade: number
	) {
		return webworkGrade * 0.15 + writtenGrade * 0.3 + examGrade * 0.45 + participationGrade * 0.1;
	}

	let writtenGrade = $derived(
		formatDecimal(calculateWrittenGrade(written, exams.gatewayAttempts, summerWinter))
	);
	let webworkGrade = $derived(formatDecimal(calculateWebworkGrade(webwork, allWebwork)));
	let participationGrade = $derived(formatDecimal(calculateParticipationGrade(participation)));
	let examGrade = $derived(formatDecimal(calculateExamGrade(exams)));
	let totalGrade = $derived(
		formatDecimal(
			calculateTotalGrade(
				calculateWebworkGrade(webwork, allWebwork),
				calculateWrittenGrade(written, exams.gatewayAttempts, summerWinter),
				calculateParticipationGrade(participation),
				calculateExamGrade(exams)
			)
		)
	);
</script>

<fieldset
	bind:this={fieldset}
	class="fieldset bg-base-200 border-base-300 rounded-box overflow-auto border p-4 lg:max-h-110"
>
	<legend class="fieldset-legend">Results</legend>

	<span class="mb-2 text-lg"><strong>Written Homework:&nbsp;</strong>{writtenGrade}%</span>
	<span class="mb-2 text-lg"><strong>WeBWorK:&nbsp;</strong>{webworkGrade}%</span>
	<span class="mb-2 text-lg"><strong>Participation:&nbsp;</strong>{participationGrade}%</span>
	<span class="mb-2 text-lg"><strong>Exams:&nbsp;</strong>{examGrade}%</span>
	<span class="mb-2 text-4xl"><strong>Total:&nbsp;</strong>{totalGrade}%</span>
</fieldset>
