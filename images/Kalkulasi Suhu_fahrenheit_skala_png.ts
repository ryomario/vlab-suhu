/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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cy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6MThlYWE0MTQtNjdmNy00MzM1LWEyYjEtZWYwNzczMTNiZTFlIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmY2MTUyZGZlLTliYzgtNDEwNC1iM2FlLTQ4OGJhNmE1M2ExNSIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmMxOWY1ZDgyLTdmYzctNGU3NS1iZDJjLWNjNjhkNDE1MGNhZSIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IkxpbnV4IgogICBHSU1QOlRpbWVTdGFtcD0iMTY2OTIwNDMxMzIxNDkxNSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjMyIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMjoxMToyM1QxODo1MTo1MSswNzowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjI6MTE6MjNUMTg6NTE6NTErMDc6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkY2ZiODE5OS1kYWJlLTRjNmMtOTA2Mi1mNGFlMWFlMGM3MGMiCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDIyLTExLTIzVDE4OjUxOjUzKzA3OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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';
export default image;