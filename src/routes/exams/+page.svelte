<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import type { ExamData } from '$lib';

	let fieldset: HTMLFieldSetElement = $state() as HTMLFieldSetElement;

	onMount(() => {
		const storedExams = sessionStorage.getItem('exams');
		if (storedExams) {
			exams = JSON.parse(storedExams);
		}
		gsap.from(fieldset, {
			y: -50,
			duration: 0.5,
			ease: 'power2.out'
		});
	});

	let exams: ExamData = $state({
		exam1: NaN,
		exam1Quiz: false,
		exam2: NaN,
		exam3: NaN,
		gatewayAttempts: 1
	});

	$effect(() => {
		sessionStorage.setItem('exams', JSON.stringify(exams));
	});
</script>

<fieldset
	bind:this={fieldset}
	class="fieldset bg-base-200 border-base-300 rounded-box overflow-auto border p-4"
>
	<legend class="fieldset-legend">Exams</legend>

	<div class="join mb-2">
		<label class="floating-label join-item">
			<input type="number" bind:value={exams.exam1} placeholder="Exam 1" class="input input-md" />
			<span>Exam 1</span>
		</label>
		<input
			type="checkbox"
			bind:checked={exams.exam1Quiz}
			class="btn join-item"
			aria-label={exams.exam1Quiz ? 'Quiz!' : 'Quiz?'}
		/>
	</div>

	<label class="floating-label my-2">
		<input type="number" placeholder="Exam 2" bind:value={exams.exam2} class="input input-md" />
		<span>Exam 2</span>
	</label>

	<label class="floating-label my-2">
		<input type="number" placeholder="Exam 3" bind:value={exams.exam3} class="input input-md" />
		<span>Exam 3</span>
	</label>

	<label class="floating-label mt-2">
		<input
			type="number"
			placeholder="Gateway Attempts"
			bind:value={exams.gatewayAttempts}
			class="input input-md"
		/>
		<span>Gateway Attempts</span>
	</label>
</fieldset>
