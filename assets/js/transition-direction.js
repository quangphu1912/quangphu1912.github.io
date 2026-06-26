// Direction-aware page transitions.
//
// Tags each cross-document View Transition with a "back" or "forward" type so the
// CSS in main.css (`:active-view-transition-type(back)`) can reverse the pull-down:
// forward navigations slide the new page down from above, browser-back rises it from
// below. Without a tag the default (forward) keyframes play.
//
// Progressive enhancement: if the Navigation API or cross-document View Transitions
// aren't supported, `event.viewTransition` is null and this is a no-op.

// "back" when the destination history entry sits before the one we left, else "forward".
function direction(activation) {
  if (!activation || !activation.from || !activation.entry) return null;
  return activation.entry.index < activation.from.index ? "back" : "forward";
}

// Outgoing document: tag the old-side snapshot as the page is swapped away.
window.addEventListener("pageswap", (event) => {
  if (!event.viewTransition) return;
  const dir = direction(event.activation);
  if (dir) event.viewTransition.types.add(dir);
});

// Incoming document: tag the new-side snapshot. This is the one the destination's CSS
// matches against, so it's what actually drives the reversed animation.
window.addEventListener("pagereveal", (event) => {
  if (!event.viewTransition) return;
  const dir = direction(window.navigation?.activation);
  if (dir) event.viewTransition.types.add(dir);
});
