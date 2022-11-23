/* eslint-disable */
import asyncLoader from '../../phet-core/js/asyncLoader.js';

const image = new Image();
const unlock = asyncLoader.createLock( image );
image.onload = unlock;
image.src = 'data:image/png;base64,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Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6ZmU0YTg3YjctZTEyNi00MjdjLWJhMzMtNzA4NWI5NzVkZjExIgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjE3NmUxNTNjLTE1MDEtNDE1Yi1hMGNmLTNjMDQwNDRkYjhlMiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjhjYzZhMzRmLWQ2Y2MtNDY3MS1iNDc2LTNjMmUyYmY2MDhhYyIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IkxpbnV4IgogICBHSU1QOlRpbWVTdGFtcD0iMTY2OTIwNDE4MzkwMTExOSIKICAgR0lNUDpWZXJzaW9uPSIyLjEwLjMyIgogICB0aWZmOk9yaWVudGF0aW9uPSIxIgogICB4bXA6Q3JlYXRvclRvb2w9IkdJTVAgMi4xMCIKICAgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMjoxMToyM1QxODo0OTo0MiswNzowMCIKICAgeG1wOk1vZGlmeURhdGU9IjIwMjI6MTE6MjNUMTg6NDk6NDIrMDc6MDAiPgogICA8eG1wTU06SGlzdG9yeT4KICAgIDxyZGY6U2VxPgogICAgIDxyZGY6bGkKICAgICAgc3RFdnQ6YWN0aW9uPSJzYXZlZCIKICAgICAgc3RFdnQ6Y2hhbmdlZD0iLyIKICAgICAgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo5ZTRhOTZkNy1iYzBkLTRlNTYtYmZhNi03ZWYyOGU5ZDliNjciCiAgICAgIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkdpbXAgMi4xMCAoTGludXgpIgogICAgICBzdEV2dDp3aGVuPSIyMDIyLTExLTIzVDE4OjQ5OjQzKzA3OjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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';
export default image;