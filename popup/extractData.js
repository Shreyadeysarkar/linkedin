(async () => {
  const profile = {
    name: document.querySelector('.top-card-layout__title')?.innerText,
    url: window.location.href,
    about: document.querySelector('.summary p')?.innerText,
    bio: document.querySelector('.pv-oc .pv-entity__description')?.innerText,
    location: document.querySelector('.top-card-layout__first-subline')?.innerText,
    followerCount: parseInt(document.querySelector('.pv-followers__title span')?.innerText.replace(/\D/g, '')),
    connectionCount: parseInt(document.querySelector('.top-card-layout__second-subline')?.innerText.replace(/\D/g, '')),
  };

  chrome.runtime.sendMessage({ type: 'SCRAPED_PROFILE', data: profile });
})();
