import React from "react";
import { Text, StyleSheet, Platform } from "react-native";
import AppText from "./Text";

function TermsText({ children, style, ...otherProps }) {
  return (
    <>
      <AppText style={styles.heading}>Terms and Conditions</AppText>
      <AppText>
        Same an quit most an. Admitting an mr disposing sportsmen. Tried on
        cause no spoil arise plate. Longer ladies valley get esteem use led six.
        Middletons resolution advantages expression themselves partiality so me
        at. West none hope if sing oh sent tell is.So feel been kept be at gate.
        Be september it extensive oh concluded of certainty. In read most gate
        at body held it ever no. Talking justice welcome message inquiry in
        started of am me. Led own hearted highest visited lasting sir through
        compass his. Guest tiled he quick by so these trees am. It announcing
        alteration at surrounded comparison. An an valley indeed so no wonder
        future nature vanity. Debating all she mistaken indulged believed
        provided declared. He many kept on draw lain song as same. Whether at
        dearest certain spirits is entered in to. Rich fine bred real use too
        many good. She compliment unaffected expression favourable any. Unknown
        chiefly showing to conduct no. Hung as love evil able to post at as.
        Tolerably earnestly middleton extremely distrusts she boy now not. Add
        and offered prepare how cordial two promise. Greatly who affixed suppose
        but enquire compact prepare all put. Added forth chief trees but rooms
        think may. Wicket do manner others seemed enable rather in. Excellent
        own discovery unfeeling sweetness questions the gentleman. Chapter
        shyness matters mr parlors if mention thought. Excited him now natural
        saw passage offices you minuter. At by asked being court hopes. Farther
        so friends am to detract. Forbade concern do private be. Offending
        residence but men engrossed shy. Pretend am earnest offered arrived
        company so on. Felicity informed yet had admitted strictly how you.
      </AppText>
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 10,
  },
});

export default TermsText;
