/* eslint-disable no-useless-escape */
import { useCallback } from 'react';

import {
  ValidInterface,
  ValidationLengthInterface,
  ValidationNullInterface,
  ValidOnlyErr,
  ValidationFreePass,
  ValidlengErr,
} from './type';

export class Validation {
  regExpSpe: RegExp;
  regExpSpace: RegExp;
  regExpNum: RegExp;
  regExpEmail: RegExp;
  regExpMobile: RegExp;
  regExpPhone: RegExp;
  regExpId: RegExp;
  regExpIdCheck: RegExp;
  regExpPass: RegExp;
  regPwFormChack: RegExp;
  regExpHyphen: RegExp;
  regExpNumber: RegExp;
  regExpImage: RegExp;
  regExpFile: RegExp;
  regExEng: RegExp;
  regExeng: RegExp;
  regExNumberOnly: RegExp;
  regExFaxNumber: RegExp;
  regKorean: RegExp;
  regKoEnNum: RegExp;
  regKoEnNumPass: RegExp;
  regNonReimbures: RegExp;
  regRefusal: RegExp;
  regBusiNum: RegExp;
  regHospitalCode: RegExp;
  regHospitalCodeAll: RegExp;
  regCommunications: RegExp;
  regExpExpenses: RegExp;
  regExpTwoDigit: RegExp;
  regExpBirthDate: RegExp;
  regExpBirthDateOn: RegExp;

  constructor() {
    /**한글만 입력 받기 */
    this.regKorean = /^[ㄱ-ㅎ|가-힣]{0,5}$/;

    /** 유저 아이디 정규식*/
    this.regExpId = /^[a-z0-9]{0,20}$/;

    /** 유저 아이디 확인 정규식*/
    // this.regExpIdCheck = /^((?=.*[a-zA-Z])(?=.*[0-9]))[0-9a-z]{4,20}$/;
    this.regExpIdCheck = /^[a-z0-9]{4,20}$/;

    /** 요양병원 코드 정규식*/
    this.regHospitalCode = /^[0-9]{0,8}$/;

    /** 요양병원 코드 전체 확인 정규식*/
    this.regHospitalCodeAll = /^\d{8}$/;

    /** 비밀번호 정규식 최대 16자의 영문 대소문자, 숫자, 특수문자 입력 정규식*/
    this.regExpPass =
      /^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{0,16}$/;

    /** 비밀번호 정규식 전체 형식 체크*/
    this.regPwFormChack =
      /^((?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]))[0-9a-zA-Z!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]{8,16}$/;

    /**핸드폰 입력 확인 정규식*/
    this.regExpNum = /[^0-9]/g;

    /**핸드폰번호 전체 형식 정규식*/
    this.regExpMobile = /^(^010)(\d{3,4})(\d{4})$/;

    /**핸드폰번호 하이픈 정규식 */
    this.regExpHyphen = /\-{1,2}$/g;

    /**특수문자 체크 정규식*/
    this.regExpSpe = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

    /**모든 공백 체크 정규식*/
    this.regExpSpace = /\s/g;

    /** 이메일 체크 정규식*/
    this.regExpEmail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    /** 일반 전화번호 정규식 */
    this.regExpPhone = /^(\d{2,3})(\d{3})(\d{4})$/;

    /** 진료비 입력 정규식 */
    this.regExpExpenses = /^[0-9,]{0,9}$/;

    /** 2자리 슷지 입력 정규식 */
    this.regExpTwoDigit = /^[0-9]{0,2}$/;

    /** 영어만 확인 */
    this.regExEng = /[a-zA-Z]/;

    /**소문자 영어만 확인*/
    this.regExeng = /[a-z]/;
    /** 슷자만 확인 */
    this.regExNumberOnly = /^[0-9-]{0,15}$/;
    this.regExFaxNumber = /^[0-9]{0,10}$/;

    /**거절 사유 한글 영어 숫자 20자*/
    this.regRefusal = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,20}$/;

    /**한글 영어 숫자 입력 받기*/
    this.regKoEnNum = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,15}$/;

    /**환자 전달 사항 입력 */
    this.regCommunications = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,200}$/;

    /**한글 영어 숫자 특수문자 입력 받기*/
    this.regKoEnNumPass =
      /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]{0,15}$/;

    // 비급여 항목명
    this.regNonReimbures =
      /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{0,15}$/;

    /** 숫자 정규식 */
    this.regExpNumber = /^[0-9]{0,8}$/;

    /** 이미지 파일 정규식 */
    this.regExpImage = /pdf|jpg|jpeg|png/i;

    /** 사업자 등록증 정규식 */
    this.regBusiNum = /^\d{3}-\d{3,4}-\d{4}$/;

    /** PDF 파일만 */
    this.regExpFile = /pdf/i;
    /**생년월일 포멧 확인 */
    this.regExpBirthDate =
      /^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;
    /**생년월일 입력 확인 */
    this.regExpBirthDateOn = /^(\d{4})(\d{2})(\d{2})$/;
  }
  /**아이디 체크 메소드*/
  idCheck(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length <= 20) {
      if (this.regExpId.test(txt)) {
        pass(txt);
        if (this.regExpIdCheck.test(txt)) {
          error({
            msg: '',
            boo: false,
          });
        } else {
          error({
            msg: '조건에 맞는 아이디를 입력해주세요.',
            boo: true,
          });
        }
      } else {
        error({
          msg: '조건에 맞는 아이디를 입력해 주세요',
          boo: true,
        });
      }
    }
  }
  /**요양기관 번호 입력 메소드*/
  hospitalCodeCheck(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length <= 8) {
      if (this.regHospitalCode.test(txt)) {
        pass(txt);
        error({
          msg: '',
          boo: false,
        });
      } else {
        error({
          msg: '요양기관번호를 입력해주세요.',
          boo: true,
        });
      }
    }
  }

  /**요양기관 번호 체크 메소드*/
  hospitalCodeAllCheck(param: ValidOnlyErr): void {
    const { txt, error } = param;
    if (txt.length < 8) {
      error({
        msg: '요양기관 번호를 입력해주세요.',
        boo: true,
      });
    }
    if (this.regHospitalCodeAll.test(txt)) {
      error({
        msg: '',
        boo: false,
      });
    } else {
      error({
        msg: '요양기관 번호를 입력해주세요.',
        boo: true,
      });
    }
  }
  /*아이디 체크 포커스 아웃 메소드*/
  idFocusOut(param: ValidOnlyErr): void {
    const { txt, error } = param;
    if (!this.regExEng.test(txt)) {
      error({
        msg: '영문 또는 숫자 조합으로 최대  4~20자 이내로 입력해 주세요.',
        boo: true,
      });
      return;
    }
    if (txt.length < 4) {
      error({
        msg: '영문 또는 숫자 조합으로 최대  4~20자 이내로 입력해 주세요.',
        boo: true,
      });
      return;
    }
  }

  /**비밀번호 입력 체크  메소드*/
  pwCheck(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length <= 16) {
      if (this.regExpPass.test(txt)) {
        pass(txt);
        if (this.regPwFormChack.test(txt)) {
          error({
            msg: '',
            boo: false,
          });
        } else {
          error({
            msg: '조건에 맞는 비밀번호를 입력해 주세요',
            boo: true,
          });
        }
      } else {
        error({
          msg: '조건에 맞는 비밀번호를 입력해 주세요',
          boo: true,
        });
      }
    }
  }

  /**환자 전달 사항*/
  communicationsInput(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (this.regCommunications.test(txt)) {
      pass(txt);
      error({
        msg: '',
        boo: false,
      });
    } else {
      error({
        msg: '1~500자리의 한글/영문/숫자',
        boo: true,
      });
    }
  }

  /** pw 포커스 아웃 */
  pwFocusOut(param: ValidOnlyErr): void {
    const { txt, error } = param;

    if (!this.regPwFormChack.test(txt)) {
      error({
        msg: '영문 대소문자,숫자,특수문자 8~16자리 조합으로 입력해 주세요.',
        boo: true,
      });
    }
    if (txt.length < 8) {
      error({
        msg: '비밀번호는 8자리 이상 16자리 이하로 입력 가능합니다.',
        boo: true,
      });
    }
  }

  /**비밀번호 전체 형태 체크 메소드*/
  pwFormCheck(param: ValidOnlyErr): boolean {
    const { txt, error } = param;
    if (!this.regPwFormChack.test(txt)) {
      error({
        msg: '조건에 맞는 비밀번호를 입력해 주세요',
        boo: true,
      });
      return true;
    }
    return false;
  }

  //담당자 이름 입력 메소드
  koValid(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (this.regKorean.test(txt)) {
      pass(txt);
      error({
        msg: '',
        boo: false,
      });
    } else {
      error({
        msg: '조건에 맞는 이름을 입력해 주세요',
        boo: true,
      });
    }
  }

  //병원이름 입력 메소드
  hocNameValid(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (this.regKoEnNum.test(txt)) {
      pass(txt);
      error({
        msg: '',
        boo: false,
      });
    } else {
      error({
        msg: '한글/영문/숫자만 입력 할 수 있습니다.',
        boo: true,
      });
    }
  }
  /**입력 없음 체크 메소드*/
  nullFormCheck(param: ValidationNullInterface): boolean {
    const { txt, error, name } = param;
    if (!txt) {
      error({
        msg: `입력하신 ${name}가 없습니다.`,
        boo: true,
      });
      return true;
    }
    return false;
  }
  /**길이 체크 메소드*/
  lengthFormCheck(param: ValidationLengthInterface): boolean {
    const { txt, error, length } = param;
    if (txt.length < length) {
      error({
        msg: `${length}자 이상 입력 해야합니다.`,
        boo: true,
      });
      return true;
    }
    return false;
  }

  /**모바일 번호 입력 형태 변경 및 체크 메소드*/
  mobileCheck(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length < 14) {
      if (txt.length > 3 && txt.substring(0, 3) !== '010') {
        error({
          msg: '앞에 3자리는 010이 들어가야합니다.',
          boo: true,
        });
        return;
      } else {
        pass(
          txt
            .replace(this.regExpNum, '')
            .replace(this.regExpMobile, `$1-$2-$3`),
        );
        error({
          msg: '',
          boo: false,
        });
      }
    }
  }

  onlyNumber(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length !== 0 && !this.regExNumberOnly.test(txt)) {
      error({
        msg: '숫자만 입력 가능합니다.',
        boo: true,
      });
      return;
    }
    pass(txt.replace(/[^0-9]/g, ''));
    error({
      msg: '',
      boo: false,
    });
  }

  phoneNumber(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (txt.length !== 0 && !this.regExNumberOnly.test(txt)) {
      error({
        msg: '숫자만 입력 가능합니다.',
        boo: true,
      });
      return;
    }
    if (txt.length <= 12) {
      pass(txt.replace(/[^0-9]/g, '').replace(this.regExpPhone, `$1-$2-$3`));
      error({
        msg: '',
        boo: false,
      });
    }
  }

  imageTypeCheck(
    file: File,
    callback: () => void,
    error: (msg: string) => void,
  ) {
    if (file) {
      let fileExt = file.type;
      if (this.regExpImage.test(fileExt) == false) {
        error('첨부파일은 pdf, jpg, png로 된 이미지만 가능합니다.');
        return;
      } else {
        callback();
      }
    }
  }

  fileTypeCheck(file: File, callback: () => void) {
    let fileExt = file.type;
    if (this.regExpFile.test(fileExt) == false) {
      alert('첨부파일은 pdf로 된 이미지만 가능합니다.');
      return;
    } else {
      callback();
    }
  }
  lengthError(param: ValidlengErr) {
    const { txt, error, num } = param;
    if (txt.length < num) {
      error({
        msg: `${num}개 이상 입력 하셔야합니다.`,
        boo: true,
      });
    }
  }

  lengthPass(param: ValidationFreePass) {
    const { txt, pass, num } = param;
    if (txt.length <= num) {
      pass(txt);
    }
  }
  // 국내 비급여 항목 명 입력
  nonReimburseListPass(param: ValidInterface) {
    const { txt, pass, error } = param;
    if (txt.length <= 15) {
      if (this.regNonReimbures.test(txt)) {
        pass(txt);
        if (!txt) {
          error({
            msg: '비급여 항목명을 입력해주세요.',
            boo: true,
          });
        } else {
          error({
            msg: '',
            boo: false,
          });
        }
      } else {
        error({
          msg: '비급여 항목명을 입력해주세요.',
          boo: true,
        });
      }
    }
  }
  // 국내 제증명 항목 명 입력
  certificatePass(param: ValidInterface) {
    const { txt, pass, error } = param;
    if (txt.length <= 15) {
      if (this.regNonReimbures.test(txt)) {
        pass(txt);
        if (!txt) {
          error({
            msg: '제증명 항목명을 입력해주세요.',
            boo: true,
          });
        } else {
          error({
            msg: '',
            boo: false,
          });
        }
      } else {
        error({
          msg: '제증명 항목명을 입력해주세요.',
          boo: true,
        });
      }
    }
  }
}

const useValidation = () => {
  const validationClass = useCallback(() => {
    return new Validation();
  }, []);

  const validation = validationClass();
  return validation;
};

export default useValidation;
