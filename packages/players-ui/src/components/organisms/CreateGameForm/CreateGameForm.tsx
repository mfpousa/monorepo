import React, { useContext } from "react";
import moment from "moment";
import { FilterInputGroup, Icon, InputSlider } from "components/atoms";
import { useTranslation } from "react-i18next";
import { FilterContext } from "globals/FilterContext";
import { ResourceAndGenderSection } from "components/molecules/FilterGames";
import { createGame, CreateGameParams } from "api/games";
import { useVenues, Venue } from "api/venues";

import "./CreateGameForm.scss";

const CreateGameForm = () => {
  const { dropdownOnChange, findValueByQueryName, inputOnChange } = useContext(
    FilterContext
  );
  const { t } = useTranslation();
  const [values, setValues] = React.useState<
    Array<{
      query: string;
      value: string;
      type: string;
      description?: string;
    }>
  >([
    {
      description: "Min Level 1",
      query: "gameMinLevel",
      type: "create-game",
      value: "1",
    },
    {
      description: "Max Level 7",
      query: "gameMaxLevel",
      type: "create-game",
      value: "7",
    },
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [establishmentName, setEstablishmentName] = React.useState("");
  const { venues, isLoading: isVenuesLoading, last, nextPage } = useVenues({
    queryStrings: { name: establishmentName },
  });
  const [
    selectedEstablishment,
    setSelectedEstablishment,
  ] = React.useState<Venue>(null);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (isLoading) return;
    if (!selectedEstablishment) {
      alert("Select an establishment.");
      return;
    }
    setIsLoading(true);
    const params: CreateGameParams = {
      resourceType: "",
      gameMinLevel: "",
      gameMaxLevel: "",
      establishmentUuid: selectedEstablishment.establishmentUuid,
      countryUuid: selectedEstablishment.countryUuid,
      provinceUuid: selectedEstablishment.provinceUuid,
      cityUuid: selectedEstablishment.cityUuid,
      startDate: "",
      startTime: "",
      duration: "",
      gameVisibilityType: "PUBLIC",
      totalParticipants: "",
      genderType: "",
    };
    values.forEach(({ query, value }) => {
      switch (query) {
        case "startDate":
          const startTime =
            values.find(({ query }) => query === "startTime")?.value || "00:00";
          params[query] = moment(value)
            .set({
              hours: parseInt(startTime.split(":")[0]),
              minutes: parseInt(startTime.split(":")[1]),
            })
            .toISOString(true);
          break;

        default:
          params[query] = value;
          break;
      }
    });
    params.endDate = moment(params.startDate)
      .set({ minutes: parseInt(params.duration) })
      .toISOString(true);
    if (params) {
      createGame(params)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    }
  };

  const handleSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEstablishmentName(event.target.value);

  const handleVenueOnClick = (venue: Venue) => () => {
    if (venue) {
      setSelectedEstablishment(venue);
      setEstablishmentName("");
    }
  };

  return (
    <div className="CreateGameForm">
      <h1 style={{ marginBottom: "10px" }}>Create A Game!</h1>
      <form className="form-container" method="POST" onSubmit={handleOnSubmit}>
        <div className="form-section search-establishment">
          <label htmlFor="establishmentName">
            {t("atoms:establishmentNameLabel")}
          </label>
          <input
            type="text"
            name="establishmentName"
            id="establishmentName"
            placeholder={t("atoms:establishmentNamePlaceholder")}
            onChange={handleSearchBarChange}
            className=""
            value={establishmentName}
          />
          <div className="venues-result">
            {selectedEstablishment && (
              <div className="selected-venue">
                <p>{selectedEstablishment?.name || "No Name"}</p>
                <button
                  type="button"
                  onClick={() => setSelectedEstablishment(null)}
                >
                  <Icon>close</Icon>
                </button>
              </div>
            )}
            {establishmentName !== "" && !selectedEstablishment ? (
              <>
                {venues.map((item) => (
                  <button
                    type="button"
                    className="venue-row"
                    onClick={handleVenueOnClick(item)}
                  >
                    {item.name || "No name"}
                  </button>
                ))}
              </>
            ) : null}
          </div>
        </div>
        <div className="form-section">
          <ResourceAndGenderSection
            findValueByQueryName={findValueByQueryName(values)}
            dropdownOnChange={dropdownOnChange("create-game", setValues)}
            onlyDropdown
          />
        </div>
        <div className="form-section">
          <FilterInputGroup
            inputType="date"
            inputLabel={t("atoms:startDateLabel")}
            inputName="startDate"
            inputId="startDate"
            inputPlaceholder="Select"
            onChange={inputOnChange("create-game", setValues)("Start at")}
            value={
              (
                values.find((item) => item.query === "endDate")?.value || ""
              ).split("T")[0]
            }
          />
          <FilterInputGroup
            inputType="time"
            inputLabel={t("atoms:startTimeLabel")}
            inputName="startTime"
            inputId="startTime"
            inputPlaceholder="Select"
            onChange={inputOnChange("create-game", setValues)("Start at")}
            value={
              (
                values.find((item) => item.query === "startTime")?.value || ""
              ).split("T")[0]
            }
          />
        </div>
        <div className="form-section">
          <FilterInputGroup
            inputType="text"
            inputLabel={t("atoms:durationLabel")}
            inputName="duration"
            inputId="duration"
            inputPlaceholder="60"
            onChange={inputOnChange("create-game", setValues)("")}
            value={values.find((el) => el.query === "duration")?.value || ""}
          />
        </div>
        <div className="form-section">
          <FilterInputGroup
            inputType="text"
            inputLabel={t("atoms:totalParticipantsLabel")}
            inputName="totalParticipants"
            inputId="totalParticipants"
            inputPlaceholder="4"
            onChange={inputOnChange("create-game", setValues)("")}
            value={
              values.find((el) => el.query === "totalParticipants")?.value || ""
            }
          />
        </div>
        <div className="form-section">
          <InputSlider
            inputOnChange={inputOnChange("create-game", setValues)}
            inputMinLabel={t("atoms:gameMinLevelLabel")}
            inputMaxLabel={t("atoms:gameMaxLevelLabel")}
            inputMinName="gameMinLevel"
            inputMaxName="gameMaxLevel"
            minSelectedValue={
              values.find((item) => item.query === "gameMinLevel")?.value || "1"
            }
            maxSelectedValue={
              values.find((item) => item.query === "gameMaxLevel")?.value || "7"
            }
          />
        </div>
        <button type="submit" className="send-form-btn" disabled={isLoading}>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateGameForm;
