<!--
  하하호호 스튜디오 공통 사진 편집 규칙 v5.1 - 영어 번역본 (AI 지시문에 실제로 들어가는 글, 최우선 규칙)
  한국어 원문: config/face-swap-rules-v5.1.md (원본: App 개발\지침 규칙\웹앱_실사용_공통사진편집_최종프롬프트_v5.1.txt)
  - 이 안내 상자(주석) 밖의 글은 모두 AI에게 그대로 보내집니다. 지시문의 맨 뒤(= 최우선)에 붙습니다.
  - 1번 사진 = Image 1 (SAMPLE PHOTO), 2번 사진 = Image 2 (CUSTOMER PHOTO) 로 번역했습니다.
  - 2026-10-14: 원문 [0]~[14] 전체를 항목 순서 그대로 번역 (써니팀 개발자). 내용 추가·삭제 없음.
  - 이 파일을 지우거나 비우면 한국어 원문(face-swap-rules-v5.1.md)을 대신 씁니다.
  - 고친 뒤 서버를 다시 켤 필요 없음: 다음 사진부터 바로 적용됩니다.
-->
[HAHAHOHO STUDIO COMMON PHOTO EDITING RULES v5.1 - FINAL PROMPT FOR LIVE USE]

[0. PRIORITY]
If rules inside this prompt conflict, the instruction that comes LATER takes priority.
However, these common photo editing rules take priority over any theme-specific detailed instructions.

Final order of priority:
1) Keep the customer's facial identity
2) Accuracy of the target age
3) Natural beautification and lifting
4) Keep the SAMPLE PHOTO's hair, body, costume, pose, expression intensity, background, props, lighting, composition and text
5) Natural integration of face, head and neck
6) Fine detail and texture

[1. ROLES OF THE INPUT IMAGES]
Image 1 = the SAMPLE PHOTO.
It is the finished original shoot that is the base of the final image.

Image 2 = the CUSTOMER PHOTO (portrait of the customer).
It is a reference photo for checking the customer's facial identity, base skin color and unique facial structure.

This request uses only Image 1 and Image 2.
Do not use a previous customer's face, a previous editing result or any other reference face.
Never swap or mix the roles of Image 1 and Image 2.

[2. GOAL]
Keep the SAMPLE PHOTO (Image 1) as the base of the final image,
and replace ONLY the facial identity of the designated person in the SAMPLE PHOTO with the facial identity of the customer in Image 2.

The result must not be a cut-and-pasted face composite;
it must look as if the customer was actually photographed in the SAMPLE PHOTO's costume, hairstyle, pose, background and lighting conditions.

Core goal:
NOT "the current selfie face as it is",
BUT "a photo-shoot face that is clearly recognizable as the customer, yet refined to the target age - younger, healthier, and more beautiful or more handsome".

[3. ELEMENTS OF THE SAMPLE PHOTO THAT MUST BE KEPT]
Keep the following exactly as in the SAMPLE PHOTO (Image 1):
- the objects, positions, sense of distance and perspective of the background
- the design, color, material, folds and decoration of the costume
- the shape and position of glasses, sunglasses, hats, jewelry and props
- the overall length, color, parting, bangs, curls, volume and arrangement of the hair
- the presence, shape, length and arrangement of a beard or mustache
- the size and proportions of the body; the shoulders, arms, hands, legs and posture
- the overall position and tilt of the head
- the gaze direction
- the type and intensity of the facial expression
- the composition, perspective, empty space and aspect ratio
- the direction and brightness of the light sources, the shadows, the color temperature and the overall color tone
- the makeup style and color tones of the SAMPLE PHOTO
- any text, logos and watermarks that originally exist in Image 1

Do not add any new text, logos, watermarks or signatures that are not in Image 1.

[4. CUSTOMER'S FACIAL IDENTITY - MUST BE KEPT]
Keep the unique features in the CUSTOMER PHOTO (Image 2) that make the customer recognizable:
- the basic shape of the eyes, the eye expression and the distance between the eyes
- the basic shape and width of the nose
- the basic shape and thickness of the lips
- the unique features of the cheekbones, cheeks, chin and face outline
- the relative structure of the mid-face
- the relative proportions of the facial features
- the overall impression
- the anatomical position of clearly visible unique moles and scars

Do not change the customer's ethnicity or the basic character of their own skin tone.
Do not turn an East Asian person into a Western or mixed-race-looking person.
Do not replace the face with a different person, a celebrity, or a generic "AI handsome man / AI beautiful woman" face.

[5. SIGNS OF AGING AND FATIGUE ARE NOT IDENTITY]
The following are NOT part of the facial identity to be preserved; actively improve them to fit the target age:
- fine lines around the eyes
- hollow under-eyes, tear troughs, dark circles
- dullness, greyish tone, tired complexion
- loss of volume in the front cheeks / apple zone
- deep nasolabial folds
- marionette lines
- drooping mouth corners
- sagging cheeks
- a widened lower face
- a collapsed jawline
- excessive loss of firmness under the chin and in the minimal neck connection area
- rough, dry or uneven skin texture and tone

Do not keep the customer's current state of aging and fatigue as it is just because the facial identity must be kept.

[6. NATURAL BEAUTIFICATION - ACTIVELY ALLOWED]
Beautification is not plastic surgery.
Without redesigning the facial features into different shapes, refine the face naturally into photo-shoot-quality condition that fits the target age.

Allowed beautification:
- make the skin tone clearer and more even
- make the under-eye area brighter and firmer
- restore natural, youthful volume in the front cheeks and apple zone
- soften fatigue and sagging around the mouth
- make the lower face look lighter, not heavy
- make the jawline natural and firm
- make the eyes clearer and more lively
- give the lips a healthy color
- keep the SAMPLE PHOTO's makeup style, but strengthen the skin rendering, healthy color and eye-area refinement to fit the target age

Forbidden beautification:
- enlarging the eyes excessively
- shrinking the nose unnaturally
- making the chin excessively pointed
- changing the face shape so it looks like a completely different person
- plastic or waxy skin
- excessive beauty filter
- replacing the face with a generic AI handsome man / AI beautiful woman face

The result must not look like "the current selfie, slightly retouched",
but like "the best photo-shoot picture of the same person at the target age".

[7. APPLYING THE TARGET AGE]
Apply the target age only to the face that is being replaced.
Do not change the SAMPLE PHOTO's hairstyle, beard, costume, body, posture or background in order to express age.

20s:
A face that looks 20 to 25 years old.
- fine lines around the eyes almost completely removed
- hollow under-eyes, tear troughs and dark circles greatly reduced
- volume of the front cheeks and apple zone restored
- nasolabial folds and drooping mouth corners minimized
- bright, even skin tone
- a light, firm lower face
- a young, natural jawline
- lively eyes and lips with healthy color
Looking like the late 30s or 40s is a failure.

30s:
A face that looks 30 to 35 years old.
- young, polished prime of life
- tear troughs and dark circles reduced
- deep nasolabial folds and marionette lines minimized
- front-cheek volume and firmness kept
- lower face and jawline refined
- healthy and polished, without tiredness

40s:
A face that looks 40 to 45 years old.
- keep dignity and maturity
- reduce fatigue, deep wrinkles and hollow under-eyes
- reduce sagging of the mouth area, cheeks and jawline
- refine skin tone and firmness
- must not look old like the 50s or 60s

50s:
A face that looks 50 to 55 years old.
- healthy and dignified
- reduce excessive aging, a sickly look and fatigue
- refine the under-eyes, cheeks, mouth area and jawline
- do not make the face look excessively young

Neither the older impression of the person in the SAMPLE PHOTO nor the customer's current age in Image 2 takes priority over the target age.

[8. FACE EDITING SCOPE AND MASK]
The default editing scope is:
the customer's face + jawline + the minimal neck connection area needed for a natural connection.

Do not newly construct the whole hairstyle, the outline of the head, the ears, the whole neck, the costume or the body.

Only at the boundary between face and hair, and the boundary between jaw and neck,
minimal blending of color, shading and edges is allowed for natural integration.

Do not invent facial features that are hidden and cannot be seen.

[9. FACE SIZE AND FACE-TO-HEAD RATIO]
Keep the overall size and position of the head in the SAMPLE PHOTO.

However, to fit the customer's face naturally inside the SAMPLE PHOTO's head,
the inner width, height and jawline position of the face may be adjusted within the minimal range that does not harm identity.

Always check:
- the face does not look too large for the head
- the face does not look too small for the head
- the face is not squashed or stretched long
- the jawline connects naturally with the outline of the SAMPLE PHOTO's head
- the whole head is not enlarged or shrunk to reflect the face shape

[10. APPLYING THE EXPRESSION]
The type and intensity of the expression follow the SAMPLE PHOTO (Image 1) first.

Keep:
- the same smile intensity
- the same degree of mouth opening
- the same teeth showing or not showing
- the same gaze direction

However,
reinterpret the basic shape and thickness of the lips and the natural movement of the facial muscles to fit the customer's facial identity.
Do not copy the incidental selfie expression of the CUSTOMER PHOTO (Image 2).

[11. INTEGRATING LIGHTING, SKIN COLOR AND TEXTURE]
Keep the basic character of the customer's skin color,
but make it look natural under the light direction, brightness, color temperature and shadows of the SAMPLE PHOTO (Image 1).

- the face must not be overly bright or overly sharp compared with the rest
- color and shading must not break abruptly at the boundaries of the face with the ears and neck
- match the skin texture, film grain and noise level of the SAMPLE PHOTO
- no outlines, double contours, color breaks or artificial shadows around the face
- the face must not look as if it had its own separate filter

[12. KEEPING HANDS, PROPS AND TEXT]
- the shape, number of fingers and position of the hands stay exactly as in the SAMPLE PHOTO (Image 1)
- glasses, sunglasses, hats, jewelry and beard follow the SAMPLE PHOTO (Image 1) only
- do not add, delete or change the text and logos of the SAMPLE PHOTO
- do not newly create any text, logos, watermarks or signatures that are not in Image 1

[13. FAILURE CONDITIONS - CHECK RIGHT BEFORE GENERATING]
If any one of the following applies, correct it and generate again:
- the face looks noticeably older than the target age
- the target is the 20s but the face looks middle-aged
- the fatigue, dullness or sagging of the original selfie remains
- the face looks less beautiful or less handsome than the original
- the face has turned into a different person
- the face looks too large for the head
- the face looks too small or squashed
- the jawline or the neck connection looks awkward
- the SAMPLE PHOTO's hair, body, costume, pose, background or text has changed
- plastic or waxy skin
- the face boundary, color, lighting or film grain does not match the rest of the photo

[14. FINAL CHECK]
Right before output, check again:
1) Can the customer be recognized?
2) Does the face look the target age?
3) Is it the same person, but a younger, better photo-shoot face?
4) Is the face size natural relative to the head?
5) Are the SAMPLE PHOTO's hair, body, costume, pose, background, lighting and text kept?
6) Do the face and the jaw, neck and hair boundaries connect like one real photograph?
