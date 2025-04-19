<script lang="ts">
	import '../app.css';
	import { onMount, type Snippet } from 'svelte';
	import { gsap } from 'gsap';
	import TextPlugin from 'gsap/TextPlugin';
	import NextPreviousButtons from '$lib/NextPreviousButtons.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let title1: HTMLSpanElement = $state() as HTMLSpanElement;
	let title2: HTMLSpanElement = $state() as HTMLSpanElement;
	let title3: HTMLSpanElement = $state() as HTMLSpanElement;

	onMount(() => {
		gsap.registerPlugin(TextPlugin);
		const tl = gsap.timeline();
		tl.set('body', { overflow: 'hidden' });
		tl.set('h1', { y: 300, scale: 1.25 });
		tl.set(title2, { x: -1000, opacity: 0 });
		tl.set('main', { opacity: 0, scale: 0.75 });
		tl.from(title1, {
			y: -100,
			opacity: 0,
			scale: 0.5,
			duration: 0.5
		});
		tl.to(title2, {
			x: 0,
			opacity: 1,
			duration: 0.5
		});
		tl.to(title3, {
			text: 'UMTYMP Calculus Courses',
			opacity: 2,
			ease: 'none'
		});
		tl.to(
			'h1',
			{
				y: 0,
				scale: 1,
				duration: 0.5
			},
			'+=0.25'
		);
		tl.set('body', { overflow: 'auto' });
		tl.to('main', {
			opacity: 1,
			scale: 1,
			duration: 0.5
		});
	});
</script>

<div class="flex h-dvh flex-col p-8">
	<h1 class="mb-8 flex flex-0 flex-col gap-2 text-center">
		<span bind:this={title1} class="text-2xl lg:text-6xl"
			>The Unofficial UMTYMP Grade Calculator</span
		>
		<span bind:this={title2} class="text-xl lg:text-4xl">for</span>
		<span bind:this={title3} class="text-3xl font-black lg:text-7xl"></span>
	</h1>
	<main class="flex flex-1 flex-col items-center justify-center gap-8">
		{@render children()}
		<NextPreviousButtons />
	</main>
</div>
