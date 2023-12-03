11/30/2023

App.jsx is edited. /workspaceGallery is created. isSandbox is true.

Worked: able to open /workspaceGallery that looks like an empty /workspace.
When the fork button is clicked, it will navigate to /workspaceGallery and it will open the different canvas .

Problem: Unable to pass xml_text to the /workspaceGallery 
Someone please set isSandbox to false and try to fix this problem. Maybe this problem will be solved by a hero.
This is beyond my ability.... (Q-Q)

Fork.jsx :
localStorage.setItem('sandbox-activity', JSON.stringify(SOMETHING));
I still can't figure out what should be passed to this ^^^^
StudentCanvas cannot get the property id.
Cannot save the galleryObject as a workspace object.


What i have done: 

Fork.jsx modified
handleSave is from helpers.jsx.
I tried to save a workspace object to the backend and failed.

blocklypage.jsx first condition-if is edited because the galleryObject do not have toolbox property.
other .jsx files modifications are alert() messages (for debugging purpose).
If you don't like it, you can copy and paste yours.


what i learned:

isSandbox true needs:
localStorage.setItem('sandbox-activity', JSON.stringify(SOMETHING));

isSandbox false needs:
localStorage.setItem('sandbox-activity', JSON.stringify(SOMETHING));

Probably need to add the galleryobject post function.
When the galleryobject is created, it should be save as a workspace object or activity object.


