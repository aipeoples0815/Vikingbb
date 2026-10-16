<!--
  하하호호스튜디오 공통 사진 편집 프롬프트 - 영어 번역본 (AI 지시문에 실제로 들어가는 글, 최우선 규칙)
  한국어 원문: config/face-swap-rules.md  (원본: App 개발\지침 규칙\공통사진편집프롬프트_2026-10-13.md)
  - 이 안내 상자(주석) 밖의 글은 모두 AI에게 그대로 보내집니다. 지시문의 맨 뒤(= 최우선)에 붙습니다.
  - 표본사진 = SAMPLE PHOTO (Image 1), 인물사진 = PERSON PHOTO (Image 2) 로 번역했습니다.
  - 고친 뒤 서버를 다시 켤 필요 없음: 다음 사진부터 바로 적용됩니다.
  - 이 파일을 지우거나 비우면 한국어 원문(face-swap-rules.md)을 대신 씁니다.
  - 2026-10-14: 원문 전체 번역 (써니팀 개발자). 내용 추가·삭제 없음, 입력 사진 역할(Image 1/2)만 덧붙임.
  - [2026-10-14 기록용 전환] 팀 회의에서 v5.1(config/face-swap-rules-v5.1*.md)로 바꿈. 이 파일은 기록용으로만 남기며 AI에 보내지 않습니다.
-->
[HAHAHOHO STUDIO COMMON PHOTO EDITING RULES - HIGHEST PRIORITY]
(Decided at the Hahahoho team meeting on 2026-10-13. These rules come LAST and override every instruction above them.)
The style photo is from now on called the SAMPLE PHOTO.
INPUT IMAGES: Image 1 = the SAMPLE PHOTO (the base: keep everything in it). Image 2 = the PERSON PHOTO of the current customer (use it for facial identity ONLY).

[1. PURPOSE]
Use the provided original SAMPLE PHOTO as the basis of the final photo, and replace ONLY the facial identity of the designated person in the SAMPLE PHOTO with the facial identity of the current customer.
These rules apply equally to every gender, age group and photo style. The results of different customers who chose the same SAMPLE PHOTO must be identical except for the customer's face and the minimal boundary needed to connect it naturally.
It must not look like a face pasted on. It must look like one natural photograph, as if the customer had actually been photographed at that location wearing the SAMPLE PHOTO's costume and hairstyle.
Limit the editing area to the face of the replacement target and the minimal connecting boundary. Do not regenerate the whole photo or recompose the shoot for the sake of natural integration.

[2. ROLES OF THE INPUT IMAGES]
- SAMPLE PHOTO (Image 1): the finished original shoot that decides the background, costume, hairstyle, props, body, pose, facial expression, lighting, composition, color, aspect ratio and image rendering style.
- PERSON PHOTO (Image 2): a reference photo to see the customer's own unique facial features and skin color.
- TARGET AGE: the age group to express in the face of the result. If not given, keep the age visible in the PERSON PHOTO.
- REPLACEMENT TARGET: when the SAMPLE PHOTO has several people, the person(s) whose face is replaced. Do not change anyone other than the designated person(s).
Never swap or mix the roles of the two images. Do not bring in the PERSON PHOTO's background, clothing, hairstyle, props, pose, expression or lighting.
Use only the original SAMPLE PHOTO and the PERSON PHOTO of the current request. Do not mix in a previous customer's face or a previous editing result.
If the roles of the SAMPLE PHOTO and the PERSON PHOTO or the replacement target are unclear, do not guess arbitrarily.

[3. KEEP THE SAMPLE PHOTO - EDITING SCOPE]
Keep the following exactly as in the SAMPLE PHOTO:
- the objects, patterns, positions and sense of distance in the background
- the design, color, material, folds and decoration of the costume
- the shape and position of glasses, sunglasses, hats, jewelry and props
- the length, color, parting, bangs, curls, volume and arrangement of the hair
- the presence, shape, length and arrangement of a beard or mustache
- the size and proportions of the body, the shoulders, arms, hands, legs and posture
- the position and tilt of the head, the face direction and the size the face occupies in the frame
- the gaze direction, the intensity of the expression, the smile angle, how far the mouth is open and whether teeth show
- the composition, perspective, empty space and the image aspect ratio
- the direction and brightness of the light sources, the shadows, the overall color and the photo texture
- the makeup style and intensity of the SAMPLE PHOTO
Do not move, enlarge, shrink or recompose any of the above in order to replace the face.
Only at the boundaries needed to connect the face outline naturally - the hairline, around the ears, and the joint of the jaw and neck - a subtle blending of color, shading and edges is allowed. Do not extend this allowance into rearranging hair, changing the hairstyle, changing the shape of the ears, or reconstructing the neck and body.
Reflect the customer's face outline within the head position and overall size of the SAMPLE PHOTO. Do not enlarge or shrink the whole head or change its proportion to the body in order to reflect the face shape.

[4. APPLYING THE CUSTOMER'S FACIAL IDENTITY AND EXPRESSION]
Reflect the unique features from the PERSON PHOTO that make the customer recognizable:
- eye shape, eye expression and the distance between the eyes
- nose shape, nose bridge and nostril wings
- the basic shape and thickness of the lips
- the characteristics of the cheekbones, cheeks, chin and face outline
- the relative proportions of the facial features and the overall impression
- clearly visible unique moles and distinctive scars
Apply the customer's facial features to the face position, size, angle and perspective of the SAMPLE PHOTO. Do not paste the frontal face of the PERSON PHOTO as-is onto a different angle in the SAMPLE PHOTO.
Do not let the features of the person in the SAMPLE PHOTO remain so that the result looks like someone other than the customer. Do not turn the customer's face into an arbitrary actor or a generic beautiful/handsome face. Do not apply uniform beautification such as enlarging the eyes, shrinking the nose or excessively narrowing the jaw.
The expression follows the SAMPLE PHOTO. While keeping the basic thickness and features of the customer's lips, reproduce the SAMPLE PHOTO's smile angle, mouth opening, and whether and how much the teeth show.
If the static outline of the lips conflicts with the SAMPLE PHOTO's expression, the SAMPLE PHOTO's expression takes priority. Natural movement of the lips, cheeks and around the eyes caused by the expression is allowed, but keep the customer's unique impression. If teeth show in the SAMPLE PHOTO, show them to the same degree in the result; if the mouth is closed, keep it closed.
The style of glasses, sunglasses, hats, jewelry and beard follows the SAMPLE PHOTO. Do not add worn accessories or a beard that exist only in the PERSON PHOTO. Connect the SAMPLE PHOTO's accessories and beard naturally to the three-dimensional form of the new face, but keep their shape and arrangement.
Reflect moles and scars at the same anatomical position on the face; do not add or exaggerate them arbitrarily. Do not assume facial features that are hidden and cannot be confirmed.

[5. APPLYING THE TARGET AGE]
Apply the target age ONLY to the face being replaced. Do not change the hairstyle, beard style, costume, body, posture or the mood of the shoot to express age.
- 20s: a face that looks 20 to 25 years old
- 30s: a face that looks 30 to 35 years old
- 40s: a face that looks 40 to 45 years old
- 50s: a face that looks 50 to 55 years old
While keeping the customer's own facial features and impression, naturally adjust age-related characteristics such as skin elasticity, fine lines, and the condition under the eyes and of the cheeks.
When applying a younger age, do not just blur the wrinkles; adjust the firmness and volume under the eyes, in the cheeks and around the mouth together so the face looks the specified age. In doing so, do not excessively change the customer's own facial bone structure and features.
Do not let the older impression of the person in the SAMPLE PHOTO, or the existing age in the PERSON PHOTO, take priority over the target age. Conversely, do not make the skin excessively smooth or deform the eyes, nose or mouth so that the face becomes a different person.

[6. INTEGRATE NATURALLY AS ONE PHOTO]
Express the customer's facial identity under the shooting conditions of the SAMPLE PHOTO.
Match the face's three-dimensional form, perspective, light direction, brightness, color temperature and shadow strength to the SAMPLE PHOTO. Do not bring over the lighting and shadows that were in the PERSON PHOTO.
Based on the customer's own skin color, render it so that it looks natural under the SAMPLE PHOTO's lighting. Do not let color and shading break abruptly at the boundary between the face and the ears or neck. Perform any needed correction only inside the minimal connecting boundary; do not repaint the ears, neck or whole body to match the skin color, and do not excessively change the customer's skin color.
Keep exactly as in the SAMPLE PHOTO where hair, glasses, hats, jewelry and beard cover the face and their front-to-back order. Connect the shadows these elements cast on the new face so they match the SAMPLE PHOTO's light sources.
Match the face's sharpness, skin texture, film grain and noise level to the SAMPLE PHOTO. Do not let only the face look too bright, too sharp or too smooth, and do not let it look blurry, smudged or with an artificial skin texture.
Do not create outlines, smearing, double contours, color breaks or unnatural shadows around the face. Do not apply a separate filter or image style only to the face.
Keep the original aspect ratio and pixel size of the SAMPLE PHOTO, and do not crop, enlarge, shrink, filter or color-correct the whole image.
The final photo must have consistent depth and texture, as if the face and all other elements were photographed together with the same camera and the same lighting.
