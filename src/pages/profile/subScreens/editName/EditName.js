import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import Header from "../../../../components/header";
import { Paths } from "../../../../routing/config/paths";
// import TextInputCustom from "../../../../components/hookFormsComponents/TextInput";
import * as config from "./config";
import SvgMaker from "../../../../components/svgMaker";
import {
  putUpdateProfileRequest,
  getUserProfileDataRequest,
} from "../../../../redux/user/requests";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

const EditName = () => {
  // HOOKS
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  // STYLES
  const classes = useStyles(theme);

  // SELECTORS
  const { lang } = useAppSelector(({ settingSlice }) => settingSlice);
  const { userInfo } = useAppSelector(({ userSlice }) => userSlice);

  // STATES
  const [errorBack, setErrorBack] = React.useState("");

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  // FUNCTIONS
  const backToProfile = () => {
    navigation.navigate(Paths.profile, {
      isOwnerProfile: true,
    });
  };

  const onSubmit = (data) => {
    const sendData = {};
    if (data.firstName !== userInfo.firstName) {
      sendData.firstName = data.firstName;
    }

    if (data.lastName !== userInfo.lastName) {
      sendData.lastName = data.lastName;
    }

    Object.keys(sendData).length
      ? dispatch(
          putUpdateProfileRequest({
            data: sendData,
            cb: () => {
              dispatch(
                getUserProfileDataRequest({
                  cb: () => {
                    backToProfile();
                  },
                })
              );
            },
          })
        )
      : backToProfile();
    errorBack && setErrorBack("");
  };

  // USEEFFECTS
  React.useEffect(() => {
    // set defaultValues form from back
    if (!getValues("firstName") && userInfo.firstName) {
      setValue("firstName", `${userInfo.firstName}`);
    }
    if (!getValues("lastName") && userInfo.lastName) {
      setValue("lastName", `${userInfo.lastName}`);
    }
  }, [userInfo]);

  return (
    <SafeAreaView className={classes.container}>
      <Header
        styles={{
          top: classes.headerTop,
        }}
        title={"Edit Name"}
        navigationAlternativeBack={backToProfile}
        renderTopRightComponent={() => (
          <Pressable onClick={handleSubmit(onSubmit)}>
            <SvgMaker name="svgs_filled_check_square" strokeFill={"#ffffff"} />
          </Pressable>
        )}
      />
      <View className={classes.wrapper}>
        {config.fieldsEditName.map((el, key) => (
          <Controller
            key={key}
            control={control}
            rules={el.validate}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputCustom
                style={el.style}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errors={errors}
                error={errors[el.fieldName]}
                keyboardType={el.keyboardType}
                placeholder={el.placeholder}
                secureTextEntry={false}
                styles={el.styles}
              />
            )}
            name={el.fieldName}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default React.memo(EditName);
