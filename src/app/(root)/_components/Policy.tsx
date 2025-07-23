import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Policy = () => {
  return (
    <Accordion type='single' collapsible className='border-t border-gray-200 pt-4'>
      <AccordionItem value='item-1'>
        <AccordionTrigger>사업자 정보</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <p>
            상호명: 요니(Yawny) | 대표자: 이하얀 사업자등록번호: 123-45-67890 통신판매업신고번호: 제2025-서울강남-1234호
            주소: 서울특별시 강남구 테헤란로 123, 4층 대표번호: 02-123-4567 | 이메일: contact@yawny.shop 호스팅 제공자:
            (주)스위프트웹 개인정보관리책임자: 이하얀 (privacy@yawny.shop)
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='item-2'>
        <AccordionTrigger>법적 고지사항</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <div>
            <p className='font-semibold'>개인정보 처리방침</p>
            <p>
              Yawny는 회원님의 개인정보를 안전하게 처리하며, 관련 법령에 따라 보호합니다. 자세한 내용은
              <span className='text-blue-500 underline ml-1 cursor-pointer'>개인정보처리방침</span>을 참조해 주세요.
            </p>
          </div>

          <div>
            <p className='font-semibold'>배송 및 교환/반품 정책</p>
            <ul className='list-disc pl-5 space-y-1'>
              <li>상품 배송은 결제일로부터 영업일 기준 1~3일 내에 출고됩니다.</li>
              <li>교환 및 반품은 상품 수령 후 7일 이내에 신청 가능합니다.</li>
              <li>사용 또는 훼손된 상품은 교환/반품이 불가합니다.</li>
              <li>
                자세한 사항은
                <span className='text-blue-500 underline ml-1 cursor-pointer'>교환/반품 정책</span>을 참고해 주세요.
              </li>
            </ul>
          </div>

          <div>
            <p className='font-semibold'>저작권 안내</p>
            <p>
              본 사이트의 모든 콘텐츠(텍스트, 이미지, 디자인 등)는 요니(Yawny) 또는 제공자에게 저작권이 있으며, 무단
              복제 및 사용을 금지합니다.
            </p>
          </div>

          <div>
            <p className='font-semibold'>면책 조항</p>
            <ul className='list-disc pl-5 space-y-1'>
              <li>Yawny는 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
              <li>외부 링크나 제3자 콘텐츠는 해당 제공자 책임 하에 운영됩니다.</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value='item-3'>
        <AccordionTrigger>고객 지원</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <div>
            <p className='font-semibold'>운영시간</p>
            <p>월–금 오전 10시 ~ 오후 5시 (점심시간: 12시~1시, 주말/공휴일 휴무)</p>
          </div>

          <div>
            <p className='font-semibold'>연락처</p>
            <ul className='list-disc pl-5 space-y-1'>
              <li>
                이메일:
                <a href='mailto:support@yawny.shop' className='text-blue-500 underline'>
                  support@yawny.shop
                </a>
              </li>
              <li>
                카카오톡 채널: <span className='text-gray-700'>@yawny_shop</span>
              </li>
            </ul>
          </div>

          <div>
            <p className='font-semibold'>자주 묻는 질문</p>
            <p>
              배송, 반품, 결제 등에 대한 궁금증은
              <span className='text-blue-500 underline cursor-pointer'>자주 묻는 질문</span>을 참고해 주세요.
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Policy;
