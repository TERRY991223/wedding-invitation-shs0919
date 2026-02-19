<script lang="ts">

	import { _ } from 'svelte-i18n';
	import { localeStore } from '../i18n.svelte';
	import letterDeco from '$lib/assets/letter-deco.svg';

	const nameDivider = `
    <svg width="3" height="3" viewBox="0 0 3 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#B99493"/>
    </svg>`;
</script>

<section class="letter">
	<div class="header">
		<img class="header-deco" src={letterDeco} alt="letter header deco" />
		<h2 class="title {localeStore.locale}">{$_('letter.date')}</h2>
		<p class="sub-title {localeStore.locale}">{$_('letter.sub_title')}</p>
	</div>

	<div class="letter-container">
		<p class="letter {localeStore.locale}">{$_('letter.letter_content')}</p>
		<div class="family-description kr">
			<p>
				{$_('letter.family_names.groom_father')}<span class="name-divider"
			>{@html nameDivider}</span
			>
				{$_('letter.family_names.groom_mother')}
				<span class="son">{$_('letter.family_names.groom_son_label')}</span>{$_(
				'letter.family_names.groom_name'
			)}
			</p>
			<p>
				{$_('letter.family_names.bride_father')}<span class="name-divider"
			>{@html nameDivider}</span
			>
				{$_('letter.family_names.bride_mother')}<span class="daughter"
			>{$_('letter.family_names.bride_daughter_label')}</span
			>{$_('letter.family_names.bride_name')}
			</p>
		</div>
	</div>
</section>

<img class="letter-bottom" src="/personal-assets/letter.webp" alt="letter bottom" />

<style lang="scss">
  section.letter {
    padding: 4.5em 3.5em 3em 3.5em;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2em;
  }

  img.header-deco {
    width: 12em;
    margin-bottom: 0.8em;
  }

  .title {
    color: $primary-color;
    letter-spacing: 1px;

    &.kr {
      @extend .title-font-kr;
      margin-bottom: 0.4em;
    }

    &.en {
      @extend .title-font-en;
      margin-bottom: 0.2em;
    }
  }

  .sub-title {
    color: $primary-color;

    &.kr {
      font-weight: 500;
      font-size: 1rem;
    }

    &.en {
      font-size: 1.3rem;
      font-weight: 600;
    }
  }

  p.letter {
    white-space: pre-line;
    text-align: center;

    &.kr {
      line-height: 2.3em;
      font-size: 0.9rem;
    }

    &.en {
      line-height: 1.8em;
      font-size: 1.2rem;
    }
  }

  .letter-signature {
    margin-top: 2em;

    p {
      text-align: right;
      font-size: 1.2rem;
    }
  }

  .family-description {
    margin-top: 2em;

    p {
      color: $font-color-default;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 5px;
      margin-bottom: 20px;
      align-items: center;

      .name-divider {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .son,
      .daughter {
        display: flex;
        justify-content: center;
        font-size: 12px;
        color: $primary-color;
        white-space: nowrap; /* 줄 바꿈 방지 */
      }
    }
  }
</style>
