<script>
	export let link = '/';
	export let label;
	export let target = '_self';
</script>

<button
	class="justify-center items-center border-2 border-black dark:border-white dark:hover:bg-teal-500 hover:bg-teal-500 hover:text-white hover:border-white p-[10px] md:max-w-[200px]"
>
	<a href={link} {target}>{label}</a></button
>
