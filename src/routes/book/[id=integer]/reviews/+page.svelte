<script lang="ts">
	import { buildImageUrl } from '$lib/components/book/book';
	import NoIndex from '$lib/components/layout/NoIndex.svelte';
	import PageTitle from '$lib/components/layout/PageTitle.svelte';
	import Reviews from '$lib/components/review/Reviews.svelte';
	import { getDisplayPrefsContext, getTitleDisplay } from '$lib/display/prefs';

	let { data } = $props();

	const displayPrefs = getDisplayPrefsContext();
	let imageUrl = $derived(buildImageUrl(data.book.image?.filename));
	let book = $derived(data.book);
	let title = $derived(getTitleDisplay({ obj: book, prefs: $displayPrefs.title_prefs }));
</script>

<PageTitle title="Reviews for {title}"></PageTitle>
{#if data.reviews.length === 0}
	<NoIndex />
{/if}

<Reviews
	currentPage={data.currentPage}
	totalPages={data.totalPages}
	results={data.count}
	{imageUrl}
	itemId={book.id}
	itemType="book"
	reviews={data.reviews}
	userHasReview={data.userHasReview}
	reviewSubjectTitle={title}
/>
