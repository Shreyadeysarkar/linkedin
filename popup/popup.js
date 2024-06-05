document.addEventListener('DOMContentLoaded', function() {
  const interactBtn = document.getElementById('interactBtn');
  const likeCountInput = document.getElementById('likeCount');
  const commentCountInput = document.getElementById('commentCount');

  function updateButtonState() {
      if (likeCountInput.value && commentCountInput.value) {
          interactBtn.disabled = false;
      } else {
          interactBtn.disabled = true;
      }
  }

  likeCountInput.addEventListener('input', updateButtonState);
  commentCountInput.addEventListener('input', updateButtonState);

  interactBtn.addEventListener('click', function() {
      const likeCount = parseInt(likeCountInput.value);
      const commentCount = parseInt(commentCountInput.value);
      const linkedinFeedUrl = "https://www.linkedin.com/feed/";

      chrome.tabs.create({ url: linkedinFeedUrl }, (tab) => {
          chrome.scripting.executeScript(
              {
                  target: { tabId: tab.id },
                  function: interactWithFeed,
                  args: [likeCount, commentCount]
              }
          );
      });
  });

  function interactWithFeed(likeCount, commentCount) {
      function getRandomElements(array, count) {
          const shuffled = array.sort(() => 0.5 - Math.random());
          return shuffled.slice(0, count);
      }

      const posts = document.querySelectorAll('.feed-shared-update-v2');
      const postsToLike = getRandomElements(Array.from(posts), likeCount);
      const postsToComment = getRandomElements(Array.from(posts), commentCount);

      postsToLike.forEach(post => {
          const likeButton = post.querySelector('button[data-control-name="react"]');
          if (likeButton) likeButton.click();
      });

      postsToComment.forEach(post => {
          const commentButton = post.querySelector('button[data-control-name="comment"]');
          if (commentButton) {
              commentButton.click();
              setTimeout(() => {
                  const commentInput = post.querySelector('textarea.comments-comment-box__textarea');
                  if (commentInput) {
                      commentInput.value = 'CFBR';
                      const event = new Event('input', { bubbles: true });
                      commentInput.dispatchEvent(event);
                      const submitButton = post.querySelector('button.comments-comment-box__submit-button');
                      if (submitButton) submitButton.click();
                  }
              }, 1000); // Adjust the delay if necessary
          }
      });
  }
});
