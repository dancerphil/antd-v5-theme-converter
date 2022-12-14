import {createRegion} from 'region-core';
import {Button, Modal, Checkbox, Radio, RadioChangeEvent} from "antd";
import {SettingOutlined} from '@ant-design/icons';
import {useTranslate} from "./Translate";
import {useCallback, useState} from "react";
import {CheckboxChangeEvent} from "antd/es/checkbox";
import styled from "@emotion/styled";

const ignoreColorPalettesRegion = createRegion(false);

export const useIgnoreColorPalettes = ignoreColorPalettesRegion.useValue;

const handleIgnoreColorPalettes = (e: CheckboxChangeEvent) => ignoreColorPalettesRegion.set(e.target.checked);

const ignoreUnsupportedLessFunctionsRegion = createRegion(false);

export const useIgnoreUnsupportedLessFunctions = ignoreUnsupportedLessFunctionsRegion.useValue;

const handleIgnoreUnsupportedLessFunctions = (e: CheckboxChangeEvent) => ignoreUnsupportedLessFunctionsRegion.set(e.target.checked);

const tabWidthRegion = createRegion(2);

export const useTabWidth = tabWidthRegion.useValue;

const handleTabWidth = (e: RadioChangeEvent) => tabWidthRegion.set(e.target.value);

const tabWidthOptions = [
  {
    value: 2,
    label: 2
  },
  {
    value: 4,
    label: 4
  }
];

const trailingCommaRegion = createRegion<'none' | 'es5' | 'all'>('es5');

export const useTrailingComma = trailingCommaRegion.useValue;

const handleTrailingComma = (e: RadioChangeEvent) => trailingCommaRegion.set(e.target.value);

const trailingCommaOptions = [
  {
    value: 'none',
    label: 'None'
  },
  {
    value: 'es5',
    label: 'ES5'
  },
  {
    value: 'all',
    label: 'All'
  }
];


const Title = styled.div`
  font-weight: bold;
  margin: 20px 0 5px 0;
`;

const Label = styled.span`
  margin-right: 20px;
`;

export const SettingsButton = () => {
  const t = useTranslate();
  const ignoreColorPalettes = useIgnoreColorPalettes();
  const ignoreUnsupportedLessFunctions = useIgnoreUnsupportedLessFunctions();
  const tabWidth = useTabWidth();
  const trailingComma = useTrailingComma();
  const [open, setOpen] = useState(false);
  const handleOpenModal = useCallback(() => setOpen(true), []);
  const handleCloseModal = useCallback(() => setOpen(false), []);
  return (
    <>
      <Button
        size="small"
        type="text"
        icon={<SettingOutlined />}
        onClick={handleOpenModal}
      />
      <Modal
        title={t('??????')}
        open={open}
        onCancel={handleCloseModal}
        // ??????????????????
        footer={null}
      >
        <Title>{t('??????????????????')}</Title>
        <Checkbox checked={ignoreColorPalettes} onChange={handleIgnoreColorPalettes}>{t('??????????????????')}</Checkbox>
        <br />
        <Checkbox checked={ignoreUnsupportedLessFunctions} onChange={handleIgnoreUnsupportedLessFunctions}>{t('??????????????????less??????')}</Checkbox>
        <Title>{t('????????????')}</Title>
        <Label>{t('??????')}</Label><Radio.Group value={tabWidth} onChange={handleTabWidth} options={tabWidthOptions} />
        <br />
        <Label>{t('????????????')}</Label><Radio.Group value={trailingComma} onChange={handleTrailingComma} options={trailingCommaOptions} />
      </Modal>
    </>
  )
};
