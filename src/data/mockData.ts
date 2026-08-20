import { BodyPartInfo, Therapist, ClinicalCase, ExerciseItem, Prescription, DailyLog, BookingRequest } from '../types';

export const bodyPartsData: BodyPartInfo[] = [
  {
    id: 'neck',
    nameKo: '목 (경추)',
    nameEn: 'Cervical Spine',
    commonConditions: ['일자목/거북목', '경추 디스크', '경추 신경근증', '목 긴장성 두통'],
    icon: 'Brain',
    description: '스마트폰·모니터 사용으로 인한 거북목 및 만성 경추 통증 재활',
  },
  {
    id: 'shoulder',
    nameKo: '어깨 (견관절)',
    nameEn: 'Shoulder Joint',
    commonConditions: ['회전근개 파열 수술 후', '오십견(유착성 관절낭염)', '어깨 충돌증후군', '석회성 건염'],
    icon: 'Activity',
    description: '수술 후 가동범위(ROM) 회복 및 견갑골 안정화 도수치료',
  },
  {
    id: 'elbow',
    nameKo: '팔꿈치',
    nameEn: 'Elbow',
    commonConditions: ['테니스 엘보 (외측상과염)', '골프 엘보 (내측상과염)', '신경 포착'],
    icon: 'Minimize2',
    description: '근건 복합체 이완 및 건 회복 특화 도수치료',
  },
  {
    id: 'lower_back',
    nameKo: '허리 (요추)',
    nameEn: 'Lumbar Spine',
    commonConditions: ['요추 추간판 탈출증(디스크)', '척추관 협착증', '급성 요추 염좌', '천장관절 증후군'],
    icon: 'Shield',
    description: '심부 코어 안정화 재활 및 신경 가동술 기반 만성 요통 케어',
  },
  {
    id: 'spine',
    nameKo: '척추·체형',
    nameEn: 'Postural Spine',
    commonConditions: ['특발성 척추측만증 (Schroth)', '흉추 후만증', '골반 비대칭'],
    icon: 'Layers',
    description: '슈로스(Schroth) 3차원 교정 호흡 및 척추 불균형 밸런스 케어',
  },
  {
    id: 'hip',
    nameKo: '골반·고관절',
    nameEn: 'Pelvis & Hip',
    commonConditions: ['고관절 충돌증후군', '이상근 증후군(좌골신경통)', '골반 부정렬'],
    icon: 'Compass',
    description: '골반 경사 교정 및 둔근 활성화 신경근 재교육',
  },
  {
    id: 'knee',
    nameKo: '무릎 (슬관절)',
    nameEn: 'Knee Joint',
    commonConditions: ['전방십자인대(ACL) 재건술 후', '반월상 연골판 절제/봉합술 후', '퇴행성 관절염', '슬개대퇴 통증증후군'],
    icon: 'Zap',
    description: '수술 후 단계별 굴곡/신전 ROM 회복 및 폐쇄사슬 근력 재활',
  },
  {
    id: 'ankle',
    nameKo: '발목·발',
    nameEn: 'Ankle & Foot',
    commonConditions: ['만성 발목 불안정성', '발목 외측인대 파열 후', '족저근막염', '아킬레스 건염'],
    icon: 'Footprints',
    description: '고유수용성 감각 트레이닝 및 족부 아치 밸런스 회복',
  },
];

export const exercisesData: ExerciseItem[] = [
  {
    id: 'ex-knee-qset',
    name: '대퇴사두근 등척성 세팅 (Q-Setting)',
    category: 'knee',
    targetMuscle: '대퇴직근 / 내측광근(VMO)',
    difficulty: '초급',
    recommendedReps: '10초 유지 x 15회 (총 3세트)',
    durationSeconds: 10,
    purpose: '무릎 수술 후 초기 관절 무리 없이 허벅지 앞쪽 근육을 깨우고 부종을 감소시킵니다.',
    instructions: [
      '바닥이나 침대에 다리를 곧게 펴고 편안하게 앉습니다.',
      '무릎 아래에 얇은 수건을 둥글게 말아 받쳐줍니다.',
      '무릎 뒤쪽 오금으로 수건을 바닥 쪽으로 10초간 지그시 누릅니다.',
      '허벅지 앞쪽에 단단하게 힘이 들어가는 것을 느끼며 호흡을 유지합니다.'
    ],
    cautions: [
      '허리가 뒤로 둥글게 말리지 않도록 바른 척추 자세를 유지하세요.',
      '숨을 참지 말고 편안하게 내쉬며 힘을 줍니다.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ex-knee-heel-slide',
    name: '수건을 이용한 힐 슬라이드 (Heel Slide)',
    category: 'knee',
    targetMuscle: '슬관절 굴곡근 / 햄스트링',
    difficulty: '초급',
    recommendedReps: '12회 x 3세트',
    durationSeconds: 15,
    purpose: '통증 없는 범위 내에서 안전하게 무릎 굴곡 각도(ROM)를 점진적으로 증진시킵니다.',
    instructions: [
      '매트에 등을 대고 눕고 발뒤꿈치 아래에 수건을 둡니다.',
      '발뒤꿈치를 엉덩이 쪽으로 천천히 미끄러뜨리며 무릎을 구부립니다.',
      '최대 굴곡 지점에서 3초간 멈춘 후 천천히 시작 위치로 돌아옵니다.'
    ],
    cautions: [
      '날카로운 통증이 발생하는 각도를 넘어서서 무리하게 당기지 마세요.',
      '골반이 한쪽으로 틀어지지 않도록 고정합니다.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ex-shoulder-pendulum',
    name: '코드만 진자 운동 (Codman Pendulum)',
    category: 'shoulder',
    targetMuscle: '회전근개 이완 / 관절낭 감압',
    difficulty: '초급',
    recommendedReps: '시계/반시계 방향 각 20회',
    durationSeconds: 30,
    purpose: '팔의 무게를 이용해 어깨 관절낭에 부드러운 견인력을 주어 통증을 줄이고 이완합니다.',
    instructions: [
      '건강한 손으로 탁자나 의자를 짚고 상체를 45~90도 숙입니다.',
      '환측 팔을 바닥 쪽으로 힘을 완전히 빼고 자연스럽게 늘어뜨립니다.',
      '팔 근육의 힘이 아닌 몸통의 가벼운 반동을 이용해 원을 그리며 회전시킵니다.'
    ],
    cautions: [
      '팔 근육에 힘을 주어 젓지 마시고, 시계추처럼 중력에 맡기세요.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ex-shoulder-band-er',
    name: '세라밴드 어깨 외회전 (Band External Rotation)',
    category: 'shoulder',
    targetMuscle: '극하근 / 소원근 (회전근개 안정화)',
    difficulty: '중급',
    recommendedReps: '15회 x 3세트',
    durationSeconds: 20,
    purpose: '어깨 뒤쪽 회전근개를 강화하여 팔을 들 때 충돌 증상을 예방합니다.',
    instructions: [
      '팔꿈치를 90도로 접어 옆구리에 단단히 고정합니다.',
      '팔꿈치와 옆구리 사이에 수건을 끼우고 밴드를 양손으로 잡습니다.',
      '어깨가 솟아오르지 않게 유지하며 손을 바깥쪽으로 천천히 벌립니다.',
      '2초간 정지 후 저항을 느끼며 천천히 돌아옵니다.'
    ],
    cautions: [
      '팔꿈치가 옆구리에서 떨어지면 보상작용이 생기므로 반드시 고정하세요.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ex-spine-cat-cow',
    name: '분절형 캣-카우 스트레칭 (Cat-Cow Stretch)',
    category: 'spine',
    targetMuscle: '척추 기립근 / 흉추 가동성',
    difficulty: '초급',
    recommendedReps: '10회 천천히 반복',
    durationSeconds: 40,
    purpose: '뻣뻣해진 척추 마디마디의 분절 움직임을 유도하고 흉추의 유연성을 증진합니다.',
    instructions: [
      '어깨 아래 손목, 골반 아래 무릎이 오도록 네발기기 자세를 취합니다.',
      '숨을 들이마시며 꼬리뼈부터 시작해 가슴을 열고 시선을 살짝 올립니다(Cow).',
      '숨을 내쉬며 등을 둥글게 말고 배꼽을 바라보며 척추를 둥글립니다(Cat).'
    ],
    cautions: [
      '목만 과도하게 꺾지 말고 등과 허리의 움직임에 집중하세요.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ex-back-bird-dog',
    name: '버드독 코어 안정화 (Bird-Dog)',
    category: 'lower_back',
    targetMuscle: '다열근 / 둔근 / 심부 코어',
    difficulty: '중급',
    recommendedReps: '좌우 각 10회 x 3세트',
    durationSeconds: 30,
    purpose: '허리에 전단력 없이 척추 안정화 근육을 강화하여 디스크 재발을 방지합니다.',
    instructions: [
      '네발기기 자세에서 복부에 가볍게 힘을 주어 허리의 중립 커브를 유지합니다.',
      '오른팔과 왼다리를 바닥과 평행이 되도록 천천히 뻗어 올립니다.',
      '몸통이 좌우로 흔들리지 않도록 유지하며 3초간 버틴 후 내려옵니다.',
      '반대쪽도 동일하게 교차로 실시합니다.'
    ],
    cautions: [
      '다리를 너무 높이 들어 허리가 과도하게 꺾이지 않도록 주의하세요.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ex-neck-chin-tuck',
    name: '심부 경추 굴곡근 턱 당기기 (Chin-Tuck)',
    category: 'neck',
    targetMuscle: '경장근 / 두장근 (Deep Neck Flexors)',
    difficulty: '초급',
    recommendedReps: '5초 유지 x 15회 (하루 3회)',
    durationSeconds: 5,
    purpose: '거북목으로 약화된 목 앞쪽 심부 근육을 강화하고 후두하근의 긴장을 풉니다.',
    instructions: [
      '허리를 펴고 바르게 앉아 정면을 응시합니다.',
      '손가락으로 턱 끝을 가볍게 누르며 뒤통수를 뒤쪽 벽으로 민다는 느낌으로 턱을 당깁니다.',
      '목 뒤쪽이 길어지는 느낌을 유지하며 5초간 머무릅니다.'
    ],
    cautions: [
      '고개를 아래로 숙이는 것이 아니라 턱을 수평으로 뒤로 당기는 동작입니다.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'ex-ankle-balance',
    name: '단일 하지 지지 고유수용성 밸런스',
    category: 'ankle',
    targetMuscle: '비골근 / 족부 내재근 / 전경골근',
    difficulty: '중급',
    recommendedReps: '30초 유지 x 좌우 각 3세트',
    durationSeconds: 30,
    purpose: '발목 염좌 후 저하된 발목의 고유수용성 감각과 동적 균형 능력을 회복합니다.',
    instructions: [
      '벽이나 의자 옆에 서서 한쪽 발로 지탱하고 섭니다.',
      '지지하는 발의 무릎을 살짝 구부려(Micro-bend) 충격을 흡수합니다.',
      '시선은 정면의 한 점을 응시하며 30초간 균형을 유지합니다.'
    ],
    cautions: [
      '발목이 안쪽이나 바깥쪽으로 심하게 꺾이지 않도록 중심을 유지하세요.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
  }
];

export const therapistsData: Therapist[] = [
  {
    id: 'therapist-1',
    name: '이준혁',
    title: '스포츠재활 & 무릎/어깨 전문 물리치료사',
    clinicName: '리라이프 정형외과 도수치료센터',
    clinicAddress: '서울시 강남구 테헤란로 152 강남타워 4층',
    locationArea: '서울 강남구',
    experienceYears: 11,
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&auto=format&fit=crop&q=80',
    bio: '국가대표 스포츠 선수 및 프로 축구단 전담 의무 트레이너 출신 물리치료사입니다. 전방십자인대(ACL) 재건술 및 어깨 회전근개 수술 후 일상 복귀와 스포츠 복귀(RTP)를 전문적으로 케어합니다.',
    specializations: ['스포츠 재활', '수술 후 재활', '도수치료'],
    targetBodyParts: ['knee', 'shoulder', 'ankle'],
    isLicenseVerified: true,
    licenseNumberMasked: '보건복지부 제 48***호 (물리치료사 면허)',
    rating: 4.98,
    reviewCount: 142,
    caseCount: 38,
    openKakaoUrl: 'https://open.kakao.com/o/sample1',
    contactEmail: 'pt.leejunhyuk@remove-care.kr',
    phone: '02-555-0192',
    consultationHours: '평일 09:00 - 20:00 (토 09:00 - 15:00)',
    certifications: [
      {
        id: 'cert-1-1',
        year: '2015',
        title: '보건복지부 물리치료사 면허증',
        organization: '보건복지부',
        isVerified: true,
        category: 'license',
      },
      {
        id: 'cert-1-2',
        year: '2018',
        title: 'KAOMPT 정형도수물리치료 Master 이수',
        organization: '대한정형도수물리치료학회',
        certificateNo: 'KAOMPT-2018-0842',
        isVerified: true,
        category: 'society',
      },
      {
        id: 'cert-1-3',
        year: '2020',
        title: 'CSCS (Certified Strength and Conditioning Specialist)',
        organization: 'NSCA Korea',
        isVerified: true,
        category: 'society',
      },
      {
        id: 'cert-1-4',
        year: '2022',
        title: 'FIFA Diploma in Football Medicine',
        organization: 'FIFA Medical Network',
        isVerified: true,
        category: 'degree',
      }
    ]
  },
  {
    id: 'therapist-2',
    name: '박소연',
    title: '척추측만(Schroth) & 체형교정 전문 물리치료사',
    clinicName: '바른숨 척추체형 재활의학센터',
    clinicAddress: '서울시 서초구 반포대로 287 3층',
    locationArea: '서울 서초구',
    experienceYears: 9,
    avatarUrl: 'https://images.unsplash.com/photo-1594824813590-78965a3d74c8?w=400&auto=format&fit=crop&q=80',
    bio: '독일 Katharina Schroth 공식 인증 국제 척추측만 치료사(ISST)입니다. 청소년 및 성인 특발성 측만증의 3차원 호흡 교정과 골반 비대칭, 만성 경흉추 통증을 과학적 방사선 각도(Cobb Angle) 기반으로 추적 교정합니다.',
    specializations: ['척추측만·체형교정', '도수치료', '만성 통증 관리'],
    targetBodyParts: ['spine', 'neck', 'lower_back', 'hip'],
    isLicenseVerified: true,
    licenseNumberMasked: '보건복지부 제 56***호 (물리치료사 면허)',
    rating: 4.95,
    reviewCount: 98,
    caseCount: 29,
    openKakaoUrl: 'https://open.kakao.com/o/sample2',
    contactEmail: 'pt.parksoyeon@remove-care.kr',
    phone: '02-534-1109',
    consultationHours: '평일 10:00 - 21:00 (야간 진료)',
    certifications: [
      {
        id: 'cert-2-1',
        year: '2017',
        title: '보건복지부 물리치료사 면허증',
        organization: '보건복지부',
        isVerified: true,
        category: 'license',
      },
      {
        id: 'cert-2-2',
        year: '2019',
        title: '독일 ISST Schroth Scoliosis Therapist International',
        organization: 'ISST International',
        certificateNo: 'ISST-KR-2019-112',
        isVerified: true,
        category: 'society',
      },
      {
        id: 'cert-2-3',
        year: '2021',
        title: '필라테스 재활 인스트럭터 마스터',
        organization: '대한필라테스지도자협회',
        isVerified: true,
        category: 'society',
      }
    ]
  },
  {
    id: 'therapist-3',
    name: '강민우',
    title: '근골격계 만성통증 & 도수치료 팀장',
    clinicName: '메디핏 통증재활의원',
    clinicAddress: '경기도 성남시 분당구 정자일로 135 2층',
    locationArea: '경기 성남 분당',
    experienceYears: 14,
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80',
    bio: '14년간 10,000회 이상의 정형도수치료 임상을 거쳤습니다. 칼텐본-에반스(Kaltenborn-Evjenth), 메이틀랜드(Maitland) 관절가동술을 바탕으로 디스크 및 관절 가동성 제한을 정확한 촉진(Palpation)으로 해결합니다.',
    specializations: ['도수치료', '근골격계 질환', '수술 후 재활'],
    targetBodyParts: ['shoulder', 'lower_back', 'elbow', 'neck'],
    isLicenseVerified: true,
    licenseNumberMasked: '보건복지부 제 39***호 (물리치료사 면허)',
    rating: 4.92,
    reviewCount: 215,
    caseCount: 52,
    openKakaoUrl: 'https://open.kakao.com/o/sample3',
    contactEmail: 'pt.kangminwoo@remove-care.kr',
    phone: '031-719-8820',
    consultationHours: '월~금 08:30 - 18:30',
    certifications: [
      {
        id: 'cert-3-1',
        year: '2012',
        title: '보건복지부 물리치료사 면허증',
        organization: '보건복지부',
        isVerified: true,
        category: 'license',
      },
      {
        id: 'cert-3-2',
        year: '2015',
        title: 'Kaltenborn-Evjenth OMT Advanced Course',
        organization: 'KEO Korea',
        isVerified: true,
        category: 'society',
      },
      {
        id: 'cert-3-3',
        year: '2018',
        title: 'Maitland Concept Orthopaedic Manual Therapy',
        organization: 'IMTA (International Maitland)',
        isVerified: true,
        category: 'society',
      }
    ]
  },
  {
    id: 'therapist-4',
    name: '정유진',
    title: '신경계 보바스 & 보행재활 수석 치료사',
    clinicName: '새빛 뇌신경 재활전문병원',
    clinicAddress: '서울시 송파구 올림픽로 300 6층',
    locationArea: '서울 송파구',
    experienceYears: 10,
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
    bio: '뇌졸중, 파킨슨 및 신경 손상 후 보행 장애를 가진 환자분들의 일상 복귀를 돕는 Bobath & PNF 인증 물리치료사입니다. 보행 패턴 분석과 균형 감각 회복을 집중 지도합니다.',
    specializations: ['신경계 재활', '근골격계 질환'],
    targetBodyParts: ['ankle', 'hip', 'knee', 'spine'],
    isLicenseVerified: true,
    licenseNumberMasked: '보건복지부 제 52***호 (물리치료사 면허)',
    rating: 4.97,
    reviewCount: 84,
    caseCount: 22,
    openKakaoUrl: 'https://open.kakao.com/o/sample4',
    contactEmail: 'pt.jungyoojin@remove-care.kr',
    phone: '02-412-9901',
    consultationHours: '평일 09:00 - 18:00',
    certifications: [
      {
        id: 'cert-4-1',
        year: '2016',
        title: '보건복지부 물리치료사 면허증',
        organization: '보건복지부',
        isVerified: true,
        category: 'license',
      },
      {
        id: 'cert-4-2',
        year: '2019',
        title: 'IBITA Bobath Basic & Advanced Course',
        organization: 'International Bobath Instructors Association',
        isVerified: true,
        category: 'society',
      },
      {
        id: 'cert-4-3',
        year: '2021',
        title: 'IPNFA PNF Level 3 Course',
        organization: 'International PNF Association',
        isVerified: true,
        category: 'society',
      }
    ]
  }
];

export const clinicalCasesData: ClinicalCase[] = [
  {
    id: 'case-1',
    therapistId: 'therapist-1',
    therapistName: '이준혁',
    title: '우측 무릎 전방십자인대(ACL) 재건술 후 8주차 관절구축 및 신전 부전 재활',
    patientProfile: {
      gender: '남성',
      ageGroup: '20대 후반',
      occupation: '사회인 축구 동호인 / 사무직',
    },
    bodyPart: 'knee',
    diagnosis: '우측 슬관절 ACL 재건술 후 심한 섬유화로 인한 무릎 굴곡 85° 제한 및 대퇴사두근 근위축',
    treatmentPeriod: '2024.02 ~ 2024.04 (총 16회 세션)',
    summary: '수술 후 통증으로 인해 관절 굴곡이 85도에서 멈추어 계단 보행이 불가능했던 환자입니다. 슬개골 활주술과 단계별 편심성 운동 및 홈케어 처방을 통해 정상 가동범위인 135도 회복 및 런닝 복귀에 성공했습니다.',
    romData: {
      jointName: '슬관절 굴곡 (Knee Flexion)',
      normalRange: 140,
      beforeAngle: 85,
      afterAngle: 135,
      unit: '°',
    },
    vasData: {
      beforeVas: 8.5,
      afterVas: 1.0,
      weeklyProgress: [
        { week: '1주차', vas: 8.5, note: '초기 슬개골 부종 및 보행 통증' },
        { week: '3주차', vas: 6.0, note: '슬개골 활주 가동술 후 신전 각도 0도 확보' },
        { week: '5주차', vas: 4.2, note: '힐슬라이드 굴곡 110도 달성' },
        { week: '8주차', vas: 2.0, note: '체중지지 스쿼트 및 계단 하행 통증 소실' },
        { week: '12주차', vas: 1.0, note: '조깅 및 스포츠 복귀(RTP) 테스트 통과' },
      ],
    },
    interventions: [
      '슬개골 상하/외측 도수 가동술 (Patellar Glide Mobilization)',
      '대퇴사두근 내측광근(VMO) 신경근 전기자극 및 바이오피드백',
      '햄스트링 PNF 홀드-릴랙스 스트레칭',
      '체중 지지 점진적 닫힌사슬 운동(CKC Single-leg squat)'
    ],
    clinicalImpression: '수술 후 초기 고정 기간으로 인한 관절낭 구축이 주원인이었습니다. 도수 가동술과 함께 환자가 매일 침상에서 수행한 홈케어 Q-setting과 Heel slide 순응도가 90% 이상 유지되어 회복 속도가 매우 빨랐습니다.',
    homecareAssigned: ['대퇴사두근 등척성 세팅 (Q-Setting)', '수건을 이용한 힐 슬라이드 (Heel Slide)'],
    patientReview: {
      text: '수술 후 다리가 안 굽혀져서 축구는커녕 제대로 걷지도 못할까 봐 매일 불안했습니다. 이준혁 치료사님이 각도와 통증 그래프를 직접 보여주시며 집에서 할 운동을 앱으로 보내주셔서 매일 체크하며 따라했더니, 3달 만에 조깅까지 뛰게 되었습니다! 진심으로 감사드립니다.',
      satisfaction: 5,
    },
    publishedAt: '2024-04-15',
    likesCount: 89,
  },
  {
    id: 'case-2',
    therapistId: 'therapist-1',
    therapistName: '이준혁',
    title: '어깨 극상근 파열 관절경 봉합술 후 12주차 외전/외회전 관절구축 회복',
    patientProfile: {
      gender: '여성',
      ageGroup: '50대 중반',
      occupation: '주부 / 배드민턴 동호인',
    },
    bodyPart: 'shoulder',
    diagnosis: '우측 견관절 회전근개(극상근) 봉합술 후 어깨 외전 65° 제한 및 심한 야간통',
    treatmentPeriod: '2024.01 ~ 2024.03 (총 14회 세션)',
    summary: '팔을 옆으로 65도 이상 들지 못하고 밤마다 잠을 깰 정도로 통증이 심했던 환자입니다. 견갑흉곽관절 안정화 도수치료 및 코드만 진자운동 홈케어를 병행하여 외전 각도 160도 확보 및 통증이 소실되었습니다.',
    romData: {
      jointName: '견관절 외전 (Shoulder Abduction)',
      normalRange: 180,
      beforeAngle: 65,
      afterAngle: 160,
      unit: '°',
    },
    vasData: {
      beforeVas: 7.8,
      afterVas: 1.2,
      weeklyProgress: [
        { week: '1주차', vas: 7.8, note: '야간통 극심, 능동 외전 65도' },
        { week: '4주차', vas: 5.0, note: '수동 가동술로 외전 110도 도달, 야간통 완화' },
        { week: '8주차', vas: 3.0, note: '밴드 외회전 운동 시작, 능동 외전 140도' },
        { week: '12주차', vas: 1.2, note: '일상 주방일 및 옷 입기 완벽 가능' },
      ],
    },
    interventions: [
      '견봉하 관절낭 하방/후방 활주 도수치료',
      '소흉근 및 견갑거근 근막 이완(Myofascial Release)',
      '전거근 활성화 슬라이드 운동',
      '세라밴드 회전근개 편심성 근력 강화'
    ],
    clinicalImpression: '수술 후 보조기 착용으로 인한 견갑골 하방회전 패턴이 고착화되어 있었습니다. 견갑골 상방회전 리듬을 재교육하고 홈케어 어깨 외회전 루틴을 꾸준히 처방한 결과 가동성이 극적으로 개선되었습니다.',
    homecareAssigned: ['코드만 진자 운동 (Codman Pendulum)', '세라밴드 어깨 외회전 (Band External Rotation)'],
    patientReview: {
      text: '밤에 어깨가 쑤셔서 잠을 못 잤는데, 치료사님이 단계별로 가르쳐주신 운동 덕분에 머리도 스스로 묶고 이제는 배드민턴 라켓도 다시 잡을 수 있게 되었습니다.',
      satisfaction: 5,
    },
    publishedAt: '2024-03-28',
    likesCount: 64,
  },
  {
    id: 'case-3',
    therapistId: 'therapist-2',
    therapistName: '박소연',
    title: '특발성 흉요추 척추측만(Cobb각 28°) 교정 및 만성 편측 허리 통증 개선',
    patientProfile: {
      gender: '여성',
      ageGroup: '20대 초반',
      occupation: '대학생 (장시간 좌식 생활)',
    },
    bodyPart: 'spine',
    diagnosis: '흉추 우측 18° / 요추 좌측 28° S자형 척추측만 및 골반 비대칭, 만성 요통',
    treatmentPeriod: '2024.01 ~ 2024.05 (총 20회 세션)',
    summary: '오래 앉아 있으면 오른쪽 등과 왼쪽 골반에 뻐근한 통증이 발생하던 환자입니다. 슈로스(Schroth) 3차원 회전 호흡법과 늑골 팽창 운동을 통해 Cobb 각도를 28도에서 19도로 9도 감소시켰습니다.',
    romData: {
      jointName: '척추 회전 가동성 및 대칭 지수',
      normalRange: 100,
      beforeAngle: 42,
      afterAngle: 88,
      unit: '%',
    },
    vasData: {
      beforeVas: 7.0,
      afterVas: 0.8,
      weeklyProgress: [
        { week: '1주차', vas: 7.0, note: '1시간 이상 착석 불가' },
        { week: '4주차', vas: 4.5, note: '회전 호흡 인지 후 늑골 긴장 완화' },
        { week: '8주차', vas: 2.8, note: '골반 리포지셔닝 및 요방형근 이완' },
        { week: '16주차', vas: 0.8, note: 'X-ray 상 Cobb각 9도 감소, 통증 완전 소실' },
      ],
    },
    interventions: [
      'Schroth 3차원 회전 호흡 (Rotational Angular Breathing)',
      '오목측 늑골 확장 및 볼록측 심부 기립근 이완 도수치료',
      '골반 회전 비대칭 교정(Pelvic corrections in 3 planes)',
      '분절형 척추 가동화 매트 홈케어 처방'
    ],
    clinicalImpression: '단순한 근육 스트레칭이 아닌 함몰된 폐포 부위로 호흡을 보내는 회전호흡의 체득이 결정적이었습니다. 치료실 밖에서도 리무브 앱으로 매일 15분 호흡 일지를 작성하며 적극적으로 참여해 주셨습니다.',
    homecareAssigned: ['분절형 캣-카우 스트레칭 (Cat-Cow Stretch)', '심부 경추 굴곡근 턱 당기기 (Chin-Tuck)'],
    patientReview: {
      text: '수술 권유를 받을까 봐 무서웠는데 박소연 선생님 덕분에 척추 각도도 크게 줄고 허리 아픈 게 완전히 사라졌어요. 몸의 좌우 높낮이가 맞춰진 게 눈으로 보여서 너무 신기합니다!',
      satisfaction: 5,
    },
    publishedAt: '2024-05-10',
    likesCount: 112,
  },
  {
    id: 'case-4',
    therapistId: 'therapist-3',
    therapistName: '강민우',
    title: '요추 4-5번 추간판 탈출증(디스크) 하지 방사통 및 요추 신전 제한 개선',
    patientProfile: {
      gender: '남성',
      ageGroup: '40대 초반',
      occupation: 'IT 개발자 / 장시간 착석',
    },
    bodyPart: 'lower_back',
    diagnosis: 'L4-L5 디스크 탈출증으로 인한 좌측 둔부 및 종아리 방사통(VAS 8.8), 앙와위 하지직거상(SLR) 40°',
    treatmentPeriod: '2024.03 ~ 2024.05 (총 12회 세션)',
    summary: '다리 저림으로 10분 이상 서 있거나 걷지 못했던 중증 디스크 환자입니다. 맥켄지(McKenzie) 신전 원리와 좌골신경 신경가동술, 버드독 심부 코어 훈련을 통해 하지 방사통을 완전히 중심화(Centralization)시켰습니다.',
    romData: {
      jointName: '하지 직거상 검사 (SLR Test 각도)',
      normalRange: 90,
      beforeAngle: 40,
      afterAngle: 85,
      unit: '°',
    },
    vasData: {
      beforeVas: 8.8,
      afterVas: 1.5,
      weeklyProgress: [
        { week: '1주차', vas: 8.8, note: '종아리 저림 극심, SLR 40도에서 통증' },
        { week: '3주차', vas: 6.2, note: '신경 슬라이딩 기법 적용, 통증이 허벅지로 중심화' },
        { week: '6주차', vas: 3.5, note: '둔부 통증만 잔존, 보행 거리 1km 증가' },
        { week: '10주차', vas: 1.5, note: 'SLR 85도 정상, 저림 증상 90% 소실' },
      ],
    },
    interventions: [
      '요추 분절 감압 및 굴곡 회피 신전 도수기법',
      '좌골신경 플로싱/슬라이딩(Sciatic Nerve Flossing)',
      '복횡근(TrA) 및 다열근 초음파 유도하 바이오피드백',
      '버드독 & 데드버그 코어 안정화'
    ],
    clinicalImpression: '디스크 후방 탈출에 따른 신경근 압박 상태였으므로 초기 허리 굽힘을 철저히 금기시하고, 신경 활주술과 심부 코어를 처방했습니다. 환자분의 홈케어 일지 기록이 모범적이었습니다.',
    homecareAssigned: ['버드독 코어 안정화 (Bird-Dog)'],
    patientReview: {
      text: '수술 날짜까지 잡았다가 지푸라기 잡는 심정으로 방문했는데 강민우 팀장님 치료와 앱으로 보내주신 자세 관리 덕분에 수술 없이 다시 달릴 수 있게 되었습니다. 진정한 명의 치료사님이십니다.',
      satisfaction: 5,
    },
    publishedAt: '2024-05-18',
    likesCount: 95,
  }
];

export const initialPrescriptionsData: Prescription[] = [
  {
    id: 'rx-2024-001',
    patientName: '김민수',
    patientPhone: '010-9876-5432',
    therapistId: 'therapist-1',
    therapistName: '이준혁 물리치료사',
    clinicName: '리라이프 정형외과 도수치료센터',
    issuedDate: '2026-08-15',
    diagnosis: '우측 무릎 전방십자인대 재건술 후 6주차 회복기',
    targetGoal: '무릎 신전 0도 완전 확보 및 굴곡 125도 점진 증진, 내측광근 활성화',
    exercises: [
      {
        exercise: exercisesData[0], // Q-setting
        sets: 3,
        reps: 15,
        holdSeconds: 10,
        frequency: '하루 3회 (기상 후, 점심, 취침 전)',
        therapistNotes: '수건을 누를 때 엉덩이에 과도하게 힘이 들어가지 않도록 허벅지 앞쪽 근육에만 집중하세요.'
      },
      {
        exercise: exercisesData[1], // Heel slide
        sets: 3,
        reps: 12,
        holdSeconds: 5,
        frequency: '하루 2회 (오후, 저녁)',
        therapistNotes: '무릎에 뻐근한 당김은 정상이지만, 날카로운 통증(VAS 5 이상)이 느껴지면 멈추세요.'
      }
    ],
    specialInstructions: '얼음찜질(Ice Pack)은 운동 직후 15분간 반드시 적용해 주시고, 붓기 변화를 통증 일지에 함께 남겨주세요.',
    status: 'active'
  }
];

export const initialDailyLogsData: DailyLog[] = [
  {
    id: 'log-1',
    date: '2026-08-16',
    prescriptionId: 'rx-2024-001',
    vasScore: 6.0,
    conditionText: '힐슬라이드 할 때 무릎 안쪽이 조금 당겼지만 Q세팅 후 부기가 조금 가라앉았습니다.',
    completedExerciseIds: ['ex-knee-qset', 'ex-knee-heel-slide'],
    isAllCompleted: true,
    therapistFeedback: '첫날 아주 잘하셨습니다! 힐슬라이드 시 각도를 5도 정도만 줄여서 부드럽게 진행해 보세요.'
  },
  {
    id: 'log-2',
    date: '2026-08-17',
    prescriptionId: 'rx-2024-001',
    vasScore: 5.2,
    conditionText: '오전에 수건 누르기 3세트 완료했습니다. 힘 들어가는 느낌이 어제보다 확실히 좋아졌어요.',
    completedExerciseIds: ['ex-knee-qset', 'ex-knee-heel-slide'],
    isAllCompleted: true,
    therapistFeedback: '대퇴사두근 수축 감각이 돌아오고 있습니다. 훌륭합니다!'
  },
  {
    id: 'log-3',
    date: '2026-08-18',
    prescriptionId: 'rx-2024-001',
    vasScore: 4.5,
    conditionText: '계단 내려갈 때 찌릿하던 느낌이 많이 줄었습니다.',
    completedExerciseIds: ['ex-knee-qset', 'ex-knee-heel-slide'],
    isAllCompleted: true,
    therapistFeedback: '신전 0도가 잘 유지되고 있네요. 주말에도 아이싱 잊지 마세요.'
  },
  {
    id: 'log-4',
    date: '2026-08-19',
    prescriptionId: 'rx-2024-001',
    vasScore: 3.8,
    conditionText: '저녁 운동까지 모두 완료했습니다. 걸을 때 절뚝거림이 거의 안 느껴집니다.',
    completedExerciseIds: ['ex-knee-qset', 'ex-knee-heel-slide'],
    isAllCompleted: true,
    therapistFeedback: '다음 내원 시(목요일) 굴곡 각도 측정 후 닫힌사슬 스쿼트 단계로 넘어가겠습니다.'
  }
];

export const initialBookingsData: BookingRequest[] = [
  {
    id: 'book-1',
    therapistId: 'therapist-1',
    therapistName: '이준혁',
    patientName: '정우성',
    patientPhone: '010-3344-5566',
    preferredDate: '2026-08-25',
    preferredTime: '14:30',
    bodyPart: 'knee',
    symptoms: '반월상 연골 봉합 수술 후 4주 경과했습니다. 현재 각도가 90도에서 멈춰 있어 전문 도수치료 및 홈케어 코칭을 받고 싶습니다.',
    status: 'pending',
    createdAt: '2026-08-20 10:15'
  },
  {
    id: 'book-2',
    therapistId: 'therapist-2',
    therapistName: '박소연',
    patientName: '이지은',
    patientPhone: '010-7788-9900',
    preferredDate: '2026-08-26',
    preferredTime: '17:00',
    bodyPart: 'spine',
    symptoms: '고등학생 때부터 척추측만증이 있었는데 최근 회사 취업 후 하루종일 앉아있으니 오른쪽 날개뼈와 허리가 끊어질 듯 아픕니다.',
    status: 'confirmed',
    createdAt: '2026-08-19 18:40'
  }
];
