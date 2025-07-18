import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, Input } from "antd";
import { DateTime } from "luxon";

import Modal from "components/Modal";
import Form from "components/Form";
import FormField from "components/FormField";
import { MultipleDatePicker } from "components/DateTime/DatePicker";
import { DateRange, UserItemEntity } from "pages/home/async/entities/user-item-entity";

import { UserItem } from "../../../../../index";

import {
  addPeriodStyles,
  periodItemStyles,
  periodStyles,
  modalFooterStyles,
  modalContentStyles,
  formFieldSpacingStyles,
  scrollablePeriodListStyles,
} from "./style.css";

export type EditUserItemModalProps = {
  user?: UserItem;
  opened: boolean;
  onClose: () => void;
  onSubmit: (user: UserItemEntity) => void;
  onDelete?: (userId: string) => void;
  allUsers: UserItem[];
};

function EditUserItemModalModule({ user, opened, onClose, onSubmit, onDelete, allUsers }: EditUserItemModalProps) {
  const [userData, setUserData] = useState<UserItemEntity>(() =>
    user ? UserItemEntity.build(user) : UserItemEntity.buildEmpty(),
  );

  const [pickerValue, setPickerValue] = useState<DateRange | null>(null);

  useEffect(() => {
    if (opened) {
      if (user) {
        setUserData(UserItemEntity.build(user));
      } else {
        setUserData(UserItemEntity.buildEmpty());
      }
      setPickerValue(null);
    }
  }, [user, opened]);

  const disabledDate = (currentDate: DateTime | null) => {
    if (!currentDate) return false;
    const today = DateTime.local().startOf("day");
    const date = currentDate.startOf("day");
    return date < today;
  };

  const handleAddVacationPeriod = () => {
    if (pickerValue?.[0] && pickerValue?.[1]) {
      userData.addVacationPeriod(pickerValue);
      setPickerValue(null);
    }
  };

  const handleRemoveVacationPeriod = (range: DateRange) => {
    userData.removeVacationPeriod(range);
  };

  const handleFormSubmit = () => {
    const intersections: string[] = [];

    allUsers.forEach((otherUser) => {
      if (otherUser.fullName === userData.fullName) return;
      if (otherUser.group !== userData.group) return;

      const intersectingDates = otherUser.vacationDates.filter((date) => userData.vacationDates.includes(date));

      if (intersectingDates.length > 0) {
        intersections.push(
          `Пересечение с ${otherUser.fullName} (${otherUser.group}) на датах: ${intersectingDates.join(", ")}`,
        );
      }
    });

    if (intersections.length > 0) {
      const confirmMessage =
        "Обнаружены пересечения отпусков:\n\n" + intersections.join("\n") + "\n\nВы уверены, что хотите сохранить?";

      if (!window.confirm(confirmMessage)) {
        return;
      }
    }

    onSubmit(userData);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={userData.fullName ? "Редактировать сотрудника" : "Создать сотрудника"}
      className={modalContentStyles}
    >
      <Form onSubmit={handleFormSubmit}>
        <div className={formFieldSpacingStyles}>
          <FormField title="ФИО сотрудника">
            <Input value={userData.fullName} onChange={(e) => userData.setFullName(e.target.value)} />
          </FormField>
        </div>

        <div className={formFieldSpacingStyles}>
          <FormField title="Группа">
            <Input value={userData.group ?? ""} onChange={(e) => userData.setGroup(e.target.value)} />
          </FormField>
        </div>

        <div className={formFieldSpacingStyles}>
          <FormField title="Добавить период отпуска">
            <div className={addPeriodStyles}>
              <MultipleDatePicker
                value={pickerValue ? [pickerValue[0]?.toJSDate() ?? null, pickerValue[1]?.toJSDate() ?? null] : null}
                onChange={(value) => {
                  if (!value) {
                    setPickerValue(null);
                    return;
                  }

                  const [from, to] = value;
                  const fromDateTime = from ? DateTime.fromJSDate(from) : null;
                  const toDateTime = to ? DateTime.fromJSDate(to) : null;

                  if (fromDateTime && toDateTime) {
                    setPickerValue([fromDateTime, toDateTime]);
                  } else if (fromDateTime) {
                    setPickerValue([fromDateTime, fromDateTime]);
                  } else if (toDateTime) {
                    setPickerValue([toDateTime, toDateTime]);
                  } else {
                    setPickerValue(null);
                  }
                }}
                disabledDate={disabledDate}
              />
              <Button type="primary" onClick={handleAddVacationPeriod}>
                Добавить
              </Button>
            </div>
          </FormField>
        </div>

        <div className={formFieldSpacingStyles}>
          <FormField title="Даты отпуска">
            <div className={`${periodStyles} ${scrollablePeriodListStyles}`}>
              {userData
                .groupDatesIntoRanges(userData.vacationDates)
                .sort((a, b) => a[0].toMillis() - b[0].toMillis())
                .map(([start, end], index) => (
                  <div key={index} className={periodItemStyles}>
                    <span>
                      {start.toFormat("dd.LL.yyyy")} – {end.toFormat("dd.LL.yyyy")}
                    </span>
                    <Button size="small" onClick={() => handleRemoveVacationPeriod([start, end])}>
                      Удалить
                    </Button>
                  </div>
                ))}
            </div>
          </FormField>
        </div>

        <div className={modalFooterStyles}>
          {user?.id && onDelete && (
            <Button danger onClick={() => onDelete(user.id!)}>
              Удалить сотрудника
            </Button>
          )}
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default observer(EditUserItemModalModule);
