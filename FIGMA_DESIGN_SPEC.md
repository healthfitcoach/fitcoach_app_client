# 헬스장 앱 — Figma 디자인 스펙

---

## 1. 디자인 토큰 (Design Tokens)

### 색상 (Colors)

| 토큰 이름 | Light 모드 | Dark 모드 | 용도 |
|---|---|---|---|
| `background` | `#FFFFFF` | `#191F28` | 전체 배경 |
| `foreground` | `#191F28` | `#FFFFFF` | 기본 텍스트 |
| `primary` | `#3182F6` | `#3182F6` | 주요 강조색, 버튼, 링크 |
| `primary-foreground` | `#FFFFFF` | `#FFFFFF` | primary 배경 위 텍스트 |
| `secondary` | `#F5F7FA` | `#2D3643` | 카드, 섹션 배경 |
| `secondary-foreground` | `#191F28` | `#FFFFFF` | secondary 배경 위 텍스트 |
| `muted` | `#F5F7FA` | `#2D3643` | 비활성 배경 |
| `muted-foreground` | `#8B95A1` | `#8B95A1` | 보조 텍스트, 아이콘 |
| `border` | `#E5E8EB` | `#2D3643` | 선, 구분선 |
| `destructive` | `#F04438` | `#F04438` | 삭제, 오류, 로그아웃 |
| `success` | `#22C55E` | `#22C55E` | 성공 상태 |

### 차트 색상

| 이름 | 색상 |
|---|---|
| chart-1 (Primary) | `#3182F6` |
| chart-2 (Success) | `#22C55E` |
| chart-3 (Error) | `#F04438` |
| chart-4 (Warning) | `#F59E0B` |
| chart-5 (Purple) | `#8B5CF6` |

### 타이포그래피 (Typography)

- **폰트**: Noto Sans KR (Primary), sans-serif (Fallback)
- **모노스페이스**: Geist Mono

| 역할 | 크기 | 굵기 | 용도 |
|---|---|---|---|
| Display | 24px / 2xl | Bold (700) | 홈 인사말, 대제목 |
| Heading 1 | 20px / xl | Bold (700) | 카드 제목 |
| Heading 2 | 18px / lg | Semibold (600) | 헤더 타이틀 |
| Heading 3 | 16px / base | Semibold (600) | 섹션 제목 |
| Body | 14px / sm | Regular (400) | 본문, 설명 |
| Caption | 12px / xs | Regular (400) | 날짜, 보조 정보 |
| Label | 11px | Semibold (600) | 바텀 네비 레이블 (활성) |
| Label-inactive | 11px | Regular (400) | 바텀 네비 레이블 (비활성) |

### 모서리 (Border Radius)

| 이름 | 값 | 용도 |
|---|---|---|
| `radius-sm` | 8px | 작은 버튼, 뱃지 |
| `radius-md` | 10px | 기본 |
| `radius-lg` | 12px | 카드, 섹션 |
| `radius-xl` | 16px | 큰 카드 (rounded-2xl) |
| `radius-full` | 9999px | 원형, 아바타 |

### 간격 (Spacing)
- 화면 가로 패딩: `20px` (px-5)
- 섹션 간격: `24px` (mb-6)
- 컴포넌트 내부 패딩: `16px` (p-4), `20px` (p-5)
- 아이템 간격: `12px` (gap-3), `16px` (gap-4)

---

## 2. 공통 컴포넌트

### 앱 컨테이너
- **너비**: 최대 `448px` (max-w-md), 중앙 정렬
- **배경**: `background`
- **상단 여백**: `44px` (Status Bar 시뮬레이션)

---

### 헤더 (Header)

```
높이: 56px (min-h-[56px])
배경: background
position: sticky, top: 0, z-index: 50
패딩: 좌우 16px, 상하 12px
```

| 요소 | 스펙 |
|---|---|
| 뒤로가기 버튼 | ChevronLeft 아이콘 24×24px, 패딩 4px, hover 시 `muted` 배경, radius 8px |
| 타이틀 | 18px Semibold, `foreground`, 절대 중앙 정렬 |
| 알림 아이콘 | Bell 24×24px, 패딩 8px |
| 우측 커스텀 요소 | 자유 배치 |

**상태:**
- 뒤로가기 있음 / 없음
- 알림 아이콘 있음 / 없음

---

### 바텀 네비게이션 (Bottom Navigation)

```
position: fixed, bottom: 0
배경: background
상단 보더: 1px solid border
패딩: 상 8px, 하 24px (safe area 포함), 좌우 16px
```

| 탭 | 아이콘 | 레이블 |
|---|---|---|
| 홈 | Home (house 모양) | 홈 |
| 기록 | Record (문서 모양) | 기록 |
| 예약 | Calendar | 예약 |
| 마이 | User | 마이 |

**탭 버튼:**
- 크기: 아이콘 24×24px
- 패딩: 상하 8px, 좌우 20px
- 모서리: 8px
- 활성: `primary` 색상, 텍스트 Semibold
- 비활성: `muted-foreground` 색상, 텍스트 Regular

---

### 리스트 아이템 (Menu Item Row)

```
패딩: 좌우 16px, 상하 16px
배경: secondary > 각 항목 hover 시 muted
구분선: 1px solid border, 좌우 16px margin
```

**구조**: [아이콘 20×20px] [레이블 16px foreground] — — — [우측 텍스트 or ChevronRight]

---

## 3. 화면별 스펙

---

### 화면 1: 홈 (Home Screen)

**레이아웃 순서:**
1. 헤더 (알림 아이콘만)
2. 인사말 영역
3. 출석 카드 (CTA)
4. 내 현황 섹션
5. 빠른 메뉴 섹션

#### 인사말 영역
```
패딩: 좌우 20px, 상 8px, 하 16px
텍스트: "안녕하세요," + "경수님 👋"
폰트: 24px, Bold, foreground
줄간격: 두 줄
```

#### 출석 카드 (Check-in Card)
```
배경: primary (#3182F6)
모서리: 16px (rounded-2xl)
패딩: 20px
마진: 좌우 20px, 하 24px
```
| 요소 | 스펙 |
|---|---|
| 상단 레이블 | "오늘 운동", 14px, `primary-foreground/80` (80% 불투명도) |
| 제목 | "출석하기", 20px Bold, `primary-foreground` |
| 부제 | "헬스장에 도착하셨나요?", 14px, `primary-foreground/70` |
| 우측 원형 버튼 | 40×40px, `white/20` 배경, ChevronRight 24px, `primary-foreground` |

#### 내 현황 섹션
```
패딩: 좌우 20px, 하 24px
제목: 16px Semibold foreground + "더보기" 14px muted-foreground
카드 2개: 가로 균등 (flex gap-4)
```

**상태 카드 (2개):**
```
배경: secondary (#F5F7FA)
모서리: 12px (rounded-xl)
패딩: 16px
```
| 요소 | 스펙 |
|---|---|
| 레이블 | "회원권" / "포인트", 14px, `muted-foreground` |
| 수치 | "D-12" / "3,200P", 24px Bold, `primary` |
| 보조 | 12px, `muted-foreground` |

#### 빠른 메뉴
```
배경: secondary
모서리: 12px
overflow: hidden
```
**메뉴 항목 (4개):** PT 예약 / 운동 기록 / 기구 검색 / 공지사항
- 아이콘 20×20px, `muted-foreground`
- 텍스트 16px, `foreground`
- 구분선: 1px border, 좌우 16px margin

---

### 화면 2: 운동 기록 (Records Screen)

**레이아웃 순서:**
1. 헤더 (뒤로가기 선택, "운동 기록" 타이틀, Calendar 아이콘)
2. 날짜 네비게이션
3. 오늘의 운동 리스트
4. 기록 요약 카드

#### 날짜 네비게이션
```
패딩: 좌우 20px, 상하 12px
구조: [ChevronLeft] [날짜 텍스트 16px Medium foreground] [ChevronRight]
```

#### 운동 카드 (반복)
```
배경: secondary
모서리: 12px
패딩: 16px
간격: 12px (space-y-3)
```
| 요소 | 스펙 |
|---|---|
| 카테고리 | 14px Medium, `primary` |
| 운동명 | 14px, `muted-foreground`, 위에서 2px 띄움 |
| 세트 | 14px, `muted-foreground`, 우측 정렬 |

**데이터:** 가슴 운동 / 벤치프레스 / 4세트, 등 운동 / 렛풀다운 / 4세트, 하체 운동 / 스쿼트 / 5세트

#### 기록 요약 카드
```
배경: secondary
모서리: 12px
패딩: 20px
수평 flex, gap: 32px
```
| 항목 | 값 |
|---|---|
| 운동 시간 | 01:25:30, 24px Bold, `foreground` |
| 칼로리 | 520 kcal, 24px Bold, `foreground` |
| 레이블 | 14px, `muted-foreground` |

---

### 화면 3: 출석 체크 (Attendance Screen)

**레이아웃 순서:**
1. 헤더 (뒤로가기만)
2. 제목 + 안내 문구 (중앙 정렬)
3. QR 코드 영역
4. 타이머
5. 출석 내역 링크

#### 타이틀 영역
```
중앙 정렬, 상단 여백 16px, 하단 여백 32px
제목: "출석 체크" 24px Bold foreground
부제: "QR 코드를 스캔하여 / 출석을 완료해주세요." 14px muted-foreground 2줄
```

#### QR 코드 영역
```
중앙 정렬
외부 컨테이너: secondary 배경, 16px rounded-2xl, 32px 패딩
내부 흰 박스: white 배경, 12px rounded-xl, 16px 패딩
QR 코드 크기: 180×180px
```

#### 타이머
```
flex row, 중앙 정렬, gap 8px
Clock 아이콘: 20×20px, muted-foreground
"남은 시간" 텍스트: muted-foreground
시간값: 16px Semibold foreground
```

#### 출석 내역 보기 링크
```
w-full, 중앙 정렬
텍스트 + ChevronRight: primary 색상, Medium
```

---

### 화면 4: 회원권 관리 (Membership Screen)

**레이아웃 순서:**
1. 헤더 (뒤로가기 + "회원권 관리")
2. 회원권 카드
3. 회원권 연장 버튼
4. 정보 리스트

#### 회원권 카드
```
배경: primary (#3182F6)
모서리: 16px
패딩: 20px
마진: 좌우 20px, 상 16px, 하 24px
```
| 요소 | 스펙 |
|---|---|
| 레이블 | "헬스 정기권" 14px Medium `primary-foreground/80` |
| D-Day | 48px Bold `primary-foreground` (예: "D-12") |
| 만료일 | 14px `primary-foreground/70` |
| 배경 장식 | SVG 다이아몬드 패턴, `white/20`, 우측 상단 absolute, 80×80px |

#### 회원권 연장 버튼
```
배경: secondary
모서리: 12px
패딩: 상하 12px
아이콘: CreditCard 20×20px + "회원권 연장" 16px Medium foreground
```

#### 정보 리스트 (4개 행)
구분선: `border-b border-border`
| 항목 | 아이콘 | 우측 값 |
|---|---|---|
| 이용 지점 | MapPin | "강남점" + ChevronRight |
| 이용 시간 | Clock | "06:00 ~ 24:00" |
| 주 이용 시설 | Dumbbell | "헬스, GX룸, 사우나" + ChevronRight |
| 이용 안내 | FileText | "이용 규칙 및 안내사항" + ChevronRight |

---

### 화면 5: 포인트 (Points Screen)

**레이아웃 순서:**
1. 헤더 (뒤로가기 + "포인트")
2. 포인트 요약 카드
3. 포인트 사용 버튼
4. 탭 (적립 내역 / 사용 내역)
5. 내역 리스트

#### 포인트 요약 카드
```
배경: secondary
모서리: 16px
패딩: 20px
텍스트 중앙 정렬
```
| 요소 | 스펙 |
|---|---|
| 레이블 | "사용 가능 포인트" 14px muted-foreground |
| 포인트 | "3,200P" 36px Bold `primary` |
| 적립 예정 | "500P" 16px Medium foreground |
| 소멸 예정 | "200P" 16px Medium foreground |
| 보조 레이블 | 14px muted-foreground |

**예정 정보:** flex row, 중앙 정렬, gap 32px, 상단 margin 16px

#### 포인트 사용 버튼
```
배경: primary
모서리: 12px
패딩: 상하 12px
텍스트: 16px Semibold primary-foreground
```

#### 탭 UI
```
보더-b: 1px solid border
각 탭: flex-1, 상하 12px, 중앙 정렬, 16px Medium
```
- **활성**: `primary` 색상 + `border-b-2 border-primary`
- **비활성**: `muted-foreground`

#### 내역 아이템
```
패딩: 상하 16px
구분선: border-b border-border (마지막 제외)
```
| 요소 | 스펙 |
|---|---|
| 아이콘 컨테이너 | 40×40px 원형, secondary 배경, 아이콘 20×20px muted-foreground |
| 항목명 | 16px Medium foreground |
| 날짜 | 14px muted-foreground |
| 포인트 | 16px Semibold primary, 우측 정렬 |

**데이터:**
- 운동 기록 +100P / 2024.05.20
- 출석 체크 +50P / 2024.05.20
- PT 수업 완료 +300P / 2024.05.18
- 이벤트 참여 +200P / 2024.05.15

---

### 화면 6: PT 예약 (PT Reservation Screen)

**레이아웃:** 전체 높이, flex-col

**3단계 스텝 위저드**

#### 스텝 인디케이터
```
flex row, 중앙 정렬, gap 16px
패딩: 상하 16px
```
| 요소 | 스펙 |
|---|---|
| 스텝 원 | 32×32px 원형 |
| 완료된 스텝 | primary 배경, Check 아이콘 16px, primary-foreground |
| 현재 스텝 | primary 배경, 숫자 14px Semibold primary-foreground |
| 미래 스텝 | secondary 배경, 숫자 14px Semibold muted-foreground |
| 연결선 | 48px × 2px, border 색상 |
| 레이블 | 12px muted-foreground, 스텝 원 아래 4px |

**레이블:** 일시 선택 / 트레이너 선택 / 예약 확인

---

#### Step 1 — 날짜 선택

**월 네비게이션:**
```
flex justify-between, 하단 margin 16px
[ChevronLeft] [년월 텍스트 16px Medium] [ChevronRight]
```

**캘린더:**
```
배경: secondary
모서리: 12px
패딩: 16px
7열 그리드
```
| 요소 | 스펙 |
|---|---|
| 요일 헤더 | 14px muted-foreground, 중앙 정렬, 상하 8px |
| 날짜 | 14px foreground, hover 시 muted 배경, radius 8px |
| 선택된 날짜 | primary 배경, primary-foreground, Semibold |
| 빈 날짜 | 투명 처리 |

---

#### Step 2 — 트레이너 선택

```
space-y-3 (12px 간격)
```

**트레이너 카드:**
```
모서리: 12px
패딩: 16px
보더: 2px
```
| 상태 | 배경 | 보더 색상 |
|---|---|---|
| 미선택 | 없음 | border (#E5E8EB) |
| hover | 없음 | primary/30 |
| 선택됨 | primary/5 | primary (#3182F6) |

| 요소 | 스펙 |
|---|---|
| 아바타 | 48×48px 원형, `primary/20 → primary/40` 그라디언트, 첫 글자 primary |
| 이름 | 16px Medium foreground |
| 경력/만족도 | 14px muted-foreground |
| 시간 뱃지 | secondary 배경, radius 8px, 패딩 좌우 12px 상하 6px, primary Semibold 14px |

**데이터:**
- 김태훈 트레이너 / 경력 6년 / 4.9 / 10:00
- 이지현 트레이너 / 경력 8년 / 4.8 / 11:00
- 박민수 트레이너 / 경력 10년 / 4.9 / 12:00
- 최유진 트레이너 / 경력 5년 / 4.7 / 13:00

---

#### Step 3 — 예약 확인

```
flex-col, items-center, 상하 48px 패딩
```
| 요소 | 스펙 |
|---|---|
| 체크 원 | 80×80px, primary/10 배경, Check 아이콘 40px primary |
| 제목 | "예약이 완료되었습니다!" 20px Bold foreground, 하단 24px |
| 정보 카드 | secondary 배경, 12px radius, 20px 패딩, space-y-3 |
| 각 행 | [레이블 muted-foreground] [값 foreground Medium], justify-between |

**정보:** 예약 일시 / 트레이너 / 장소

---

#### 하단 버튼 영역

```
패딩: 20px, 하단 32px
```

**Step 1:**
| 버튼 | 스타일 |
|---|---|
| 다음 | primary 배경, primary-foreground, 16px Semibold, radius 12px, full-width, 높이 56px |

**Step 2:**
| 버튼 | 스타일 |
|---|---|
| 이전 | secondary 배경, foreground, flex-1 |
| 다음 (비활성) | muted 배경, muted-foreground |
| 다음 (활성) | primary 배경, primary-foreground |

**Step 3:**
| 버튼 | 스타일 |
|---|---|
| 확인 | primary 배경, primary-foreground, full-width |

---

### 화면 7: 마이페이지 (MyPage Screen)

**레이아웃 순서:**
1. 헤더 (타이틀만 "마이페이지")
2. 프로필 카드
3. 통계 카드 3개
4. 메뉴 리스트
5. 로그아웃 버튼

#### 프로필 카드
```
배경: secondary
모서리: 16px
패딩: 20px
flex row, gap 16px, items-center
```
| 요소 | 스펙 |
|---|---|
| 아바타 | 64×64px 원형, `primary/20 → primary/40` 그라디언트, User 아이콘 32px primary |
| 이름 | 18px Semibold foreground |
| 전화번호 | 14px muted-foreground |
| 이메일 | 14px muted-foreground |
| 오른쪽 화살표 | ChevronRight 20px, 패딩 8px |

#### 통계 카드 3개
```
3열 그리드, gap 12px
배경: secondary, 모서리: 12px, 패딩: 16px, 텍스트 중앙
```
| 통계 | 수치 | 레이블 |
|---|---|---|
| 회원권 | D-12 | 회원권 |
| 포인트 | 3,200 | 포인트 |
| 출석 | 15 | 출석일 |

- 수치: 24px Bold `primary`
- 레이블: 12px `muted-foreground`

#### 메뉴 리스트
```
배경: secondary, 모서리: 12px, overflow hidden
```
| 메뉴 | 아이콘 |
|---|---|
| 회원권 관리 | CreditCard |
| 예약 내역 | Calendar |
| 알림 설정 | Bell |
| 설정 | Settings |
| 고객센터 | HelpCircle |

각 항목: 아이콘 20px `muted-foreground` + 텍스트 16px `foreground` + ChevronRight 20px `muted-foreground`

#### 로그아웃 버튼
```
full-width, 상하 12px, 중앙 정렬
LogOut 아이콘 20px + "로그아웃" 텍스트
기본: muted-foreground
hover: destructive (#F04438)
```

---

### 화면 8: 예약 목록 (Reservation List Screen)

**레이아웃 순서:**
1. 헤더 ("예약" 타이틀 + "새 예약" 버튼)
2. 예약 카드 리스트
3. 지난 예약 링크

#### 헤더 특이사항
```
"새 예약" 버튼: primary 배경, 원형(rounded-full), 패딩 좌우 16px 상하 8px
Plus 아이콘 16px + "새 예약" 14px Medium primary-foreground
```

#### 예약 카드
```
배경: secondary, 모서리: 12px, 패딩: 16px
```
**상단 행:**
- [Calendar 20px primary] [날짜+시간 16px Semibold foreground]
- [상태 뱃지] → primary/10 배경, primary 텍스트, 12px Medium, 완전 원형(rounded-full), 패딩 좌우 8px 상하 4px

**정보 행 (2개):**
| 레이블 | 값 |
|---|---|
| 트레이너 | muted-foreground / foreground |
| 장소 | muted-foreground / foreground |

**빈 상태 (Empty State):**
```
상하 48px 패딩, 중앙 정렬
원형 컨테이너: 64×64px, secondary 배경, Calendar 32px muted-foreground
텍스트: "예약 내역이 없어요" 16px muted-foreground
버튼: primary 배경, 12px radius, 좌우 24px 상하 12px, "PT 예약하기" Semibold primary-foreground
```

#### 지난 예약 내역 보기
```
full-width, 상하 12px, 중앙
"지난 예약 내역 보기" 14px muted-foreground
```

---

## 4. 아이콘 목록

모든 아이콘은 **Lucide Icons** 기반 (stroke-width: 2, strokeLinecap: round, strokeLinejoin: round)

| 아이콘명 | 사용 위치 |
|---|---|
| Bell | 홈 헤더, 마이페이지 |
| ChevronLeft | 뒤로가기 |
| ChevronRight | 더보기, 링크 화살표 |
| Plus | 기록 추가, 새 예약 |
| CalendarDays | 기록 화면 헤더 |
| Calendar | 예약 화면, 마이페이지 |
| Clock | 출석 타이머, 회원권 이용 시간 |
| CreditCard | 회원권 연장, 마이페이지 |
| MapPin | 이용 지점 |
| Dumbbell | 기구 검색, 주 이용 시설 |
| FileText | 이용 안내 |
| GraduationCap | PT 수업 완료 (포인트) |
| Gift | 이벤트 (포인트) |
| CheckCircle | 출석 체크 (포인트) |
| Settings | 마이페이지 |
| HelpCircle | 고객센터 |
| LogOut | 로그아웃 |
| User | 마이페이지 아바타 |
| Search | 기구 검색 |
| Volume2 | 공지사항 |
| Check | 스텝 완료, 예약 완료 |
| X | PT 예약 중단 버튼 |

**커스텀 아이콘 (SVG):**
- PT 아이콘: 운동 기구 (rect + path 형태)
- Dumbbell 커스텀: 바벨 형태
- 바텀 네비 아이콘 4종: Home, Record, Calendar, User

---

## 5. 상호작용 / 상태 정의

| 상태 | 스타일 변화 |
|---|---|
| hover (버튼) | `secondary` → `muted` 배경으로 전환 |
| hover (primary 버튼) | opacity 90% |
| active (탭) | `primary` 색상 + `border-b-2` |
| selected (카드) | `border-primary` 2px + `primary/5` 배경 |
| disabled (버튼) | `muted` 배경 + `muted-foreground` 텍스트 |
| 전환 | `transition-colors` (CSS transition) |

---

## 6. Figma 작업 가이드

### 추천 작업 순서

1. **컬러 스타일** 등록 (위 토큰 참고)
2. **텍스트 스타일** 등록 (Display, H1~H3, Body, Caption, Label)
3. **공통 컴포넌트** 먼저 제작
   - Header (3가지 변형: 기본 / 뒤로가기 / 알림)
   - Bottom Navigation (4개 탭 상태)
   - 리스트 아이템 Row
   - 버튼 (primary / secondary / destructive / disabled)
   - 상태 카드
4. **각 화면 프레임** 제작 (390×844 — iPhone 14 기준)
5. **프로토타입 연결** (화면 간 네비게이션)

### 프레임 크기
- **모바일 프레임**: 390×844px (iPhone 14)
- **최대 콘텐츠 너비**: 448px (max-w-md), 중앙 정렬