# Gallery
The Gallery is an in-development feature that will ultimately allow users to share their custom projects, blocks, and lessons with other users. At the center of this effort is a new Gallery page, which displays all items posted to the Gallery in a list of “cards”. The list can be filtered via a panel on the left or by a search bar at the top of the page.
Clicking on one of the cards will take the user to a full-page item view, where they can see a preview of the posted project/block/lesson, along with the ability to like, comment, share, and fork the project they are viewing. These features can facilitate discussion, collaboration, and even a sense of achievement between students.

## Accessing Gallery
The Gallery can be found in the top-level Code Sparks menu.

## Gallery Backend
The Gallery has 3 database/Strapi objects: gallery-posts, unpinned-comments, and pinned-comments. These are accessed via Strapi endpoints.
**TO-DO:** For development purposes we gave all users all permissions associated with these endpoints. These permissions should be evaluated and assigned carefully in a production environment.

## Features
### Posting to the Gallery
Authenticated users can post their work to the Gallery from within the block editor. Clicking the <ins>Post to Gallery</ins> button invokes a Modal where users can give their project a name and set its visibility.
**TO-DO:** Allow teachers to restrict the visibility of work their students share to limit cheating.
### Gallery Page
The Gallery page shows a list of posts in a card form. Each card shows the project name, creator name, date posted, view count, and a placeholder image. The posts can be filtered by name via a search bar at the top of the page or by type and visibility using a form on the left side of the page.
**TO-DO:** Implement lazy loading to help the Gallery scale and only show restricted-visibility posts to the correct users.
### Gallery Item View
Clicking on a post on the Gallery will take the user to a separate page with more information about the post. Specifically, a few features are present here:
#### Like
Users can like a post, social network style, to indicate their interest or support of the project.
**TO-DO:** Develop functionality allowing users to see their liked posts in one view.
#### Share
Users can click the share button to send the link to a post to users outside Code Sparks. Clicking the button will attempt to invoke the browser's native share sheet and fall back to a Modal for copy/pasting.
#### Discussion Board
Each post in the Gallery has an associated discussion board, which operates like a comments section. Up to 3 comments can be pinned to the top of the discussion.
**TO-DO:** Implement editing comments.
#### Fork
Users can click the fork button to expand on an existing work in the Gallery. Clicking the button seamlessly expands the block preview into a full editor, where they can work to make the project their own. On completion, they can share the finished work as a new post to the Gallery.
**TO-DO:** Add save and compile functionality to the fork editor.

## What's Next?
* Add authentication to prevent unauthorized users from modifying or creating posts
* Pull the names of students and teachers when they post to the Gallery, and save that information with the post
* Deployment!
