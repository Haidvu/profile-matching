import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Footer from "../../components/Footer/Footer";
import NavBar from "../../components/Navbar/Navbar";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2),
    marginTop:theme.spacing(8)
  },
  subheader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  bodyHeader: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  bodyContent: {
    lineHeight: "1.8rem",
    alignItems:"justify"
  },
  topGrid: {
      marginTop: theme.spacing(4)
  },
  bottomGrid: {
      marginBottom: theme.spacing(4)
  }
}));

export default function PrivacyPolicy() {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <NavBar />
        <Grid item xs={8} className={classes.topGrid}>
          <Typography variant="h3" className={classes.title}>Privacy Policy</Typography>
          <Typography variant="body1" align={"center"}>
            Last updated: February 08, 2021
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" className={classes.subheader}>Overview</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body1" align={"justify"} className={classes.bodyContent}>
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </Typography>
          <Typography variant="body1" align={"justify"} className={classes.bodyContent}>
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy. This Privacy
            Policy has been created with the help of the Privacy Policy
            Generator.
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" className={classes.subheader}>
            Interpretation and Definitions
          </Typography>
          <Typography variant="h5" className={classes.bodyHeader}>
            Interpretation
          </Typography>
          <Typography align={"justify"} variant="body1" className={classes.bodyContent}>
            The words of which the initial letter is capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5" className={classes.bodyHeader}>
            Definitions
          </Typography>
          <Typography variant="body1" className={classes.bodyContent}>
            For the purposes of this Privacy Policy:
          </Typography>
          <Typography className={classes.bodyContent} align={"justify"}>
            <ul>
              <li>
                <p>
                  <strong>Account</strong> means a unique account created for
                  You to access our Service or parts of our Service.
                </p>
              </li>
              <li>
                <p>
                  <strong>Company</strong> (referred to as either "the Company",
                  "We", "Us" or "Our" in this Agreement) refers to
                  UHConsultingClinic.
                </p>
              </li>
              <li>
                <p>
                  <strong>Cookies</strong> are small files that are placed on
                  Your computer, mobile device or any other device by a website,
                  containing the details of Your browsing history on that
                  website among its many uses.
                </p>
              </li>
              <li>
                <p>
                  <strong>Country</strong> refers to: Texas, United States
                </p>
              </li>
              <li>
                <p>
                  <strong>Device</strong> means any device that can access the
                  Service such as a computer, a cellphone or a digital tablet.
                </p>
              </li>
              <li>
                <p>
                  <strong>Personal Data</strong> is any information that relates
                  to an identified or identifiable individual.
                </p>
              </li>
              <li>
                <p>
                  <strong>Service</strong> refers to the Website.
                </p>
              </li>
              <li>
                <p>
                  <strong>Service Provider</strong> means any natural or legal
                  person who processes the data on behalf of the Company. It
                  refers to third-party companies or individuals employed by the
                  Company to facilitate the Service, to provide the Service on
                  behalf of the Company, to perform services related to the
                  Service or to assist the Company in analyzing how the Service
                  is used.
                </p>
              </li>
              <li>
                <p>
                  <strong>Third-party Social Media Service</strong> refers to
                  any website or any social network website through which a User
                  can log in or create an account to use the Service.
                </p>
              </li>
              <li>
                <p>
                  <strong>Usage Data</strong> refers to data collected
                  automatically, either generated by the use of the Service or
                  from the Service infrastructure itself (for example, the
                  duration of a page visit).
                </p>
              </li>
              <li>
                <p>
                  <strong>Website</strong> refers to UHConsultingClinic,
                  accessible from{" "}
                  <a
                    href="www.uhconsultingclinic.com"
                    rel="external nofollow noopener"
                    target="_blank"
                  >
                    www.uhconsultingclinic.com
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <strong>You</strong> means the individual accessing or using
                  the Service, or the company, or other legal entity on behalf
                  of which such individual is accessing or using the Service, as
                  applicable.
                </p>
              </li>
            </ul>
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h4" className={classes.subheader}>
            Collecting and Using Your Personal Data
          </Typography>
          <Typography variant="h5" className={classes.bodyHeader}>
            Types of Data Collected
          </Typography>
          <Typography variant="h5" className={classes.bodyHeader}>
            Personal Data
          </Typography>
          <Typography className={classes.bodyContent}  align={"justify"}>
            <p>
              While using Our Service, We may ask You to provide Us with certain
              personally identifiable information that can be used to contact or
              identify You. Personally identifiable information may include, but
              is not limited to:
            </p>
            <ul>
              <li>
                <p>Email address</p>
              </li>
              <li>
                <p>First name and last name</p>
              </li>
              <li>
                <p>Phone number</p>
              </li>
              <li>
                <p>Usage Data</p>
              </li>
            </ul>
          </Typography>
          <Typography variant="h5" className={classes.bodyHeader}>
            Usage Data
          </Typography>
          <Typography className={classes.bodyContent} align={"justify"}>
            <p>Usage Data is collected automatically when using the Service.</p>
            <p>
              Usage Data may include information such as Your Device's Internet
              Protocol address (e.g. IP address), browser type, browser version,
              the pages of our Service that You visit, the time and date of Your
              visit, the time spent on those pages, unique device identifiers
              and other diagnostic data.
            </p>
            <p>
              When You access the Service by or through a mobile device, We may
              collect certain information automatically, including, but not
              limited to, the type of mobile device You use, Your mobile device
              unique ID, the IP address of Your mobile device, Your mobile
              operating system, the type of mobile Internet browser You use,
              unique device identifiers and other diagnostic data.
            </p>
            <p>
              We may also collect information that Your browser sends whenever
              You visit our Service or when You access the Service by or through
              a mobile device.
            </p>
          </Typography>
          <Typography variant="h5" className={classes.bodyHeader}>
            Tracking Technologies and Cookies
          </Typography>
          <Typography className={classes.bodyContent} align={"justify"}>
            <p>
              We use Cookies and similar tracking technologies to track the
              activity on Our Service and store certain information. Tracking
              technologies used are beacons, tags, and scripts to collect and
              track information and to improve and analyze Our Service. The
              technologies We use may include:
            </p>
            <ul>
              <li>
                <strong>Web Beacons.</strong> Certain sections of our Service
                and our emails may contain small electronic files known as web
                beacons (also referred to as clear gifs, pixel tags, and
                single-pixel gifs) that permit the Company, for example, to
                count users who have visited those pages or opened an email and
                for other related website statistics (for example, recording the
                popularity of a certain section and verifying system and server
                integrity).
              </li>
            </ul>
            <p>
              Cookies can be "Persistent" or "Session" Cookies. Persistent
              Cookies remain on Your personal computer or mobile device when You
              go offline, while Session Cookies are deleted as soon as You close
              Your web browser. You can learn more about cookies here:{" "}
              <a href="https://www.termsfeed.com/blog/cookies/" target="_blank">
                All About Cookies by TermsFeed
              </a>
              .
            </p>
            <p>
              We use both Session and Persistent Cookies for the purposes set
              out below:
            </p>
            <ul>
              <li>
                <p>
                  <strong>Necessary / Essential Cookies</strong>
                </p>
                <p>Type: Session Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies are essential to provide You with
                  services available through the Website and to enable You to
                  use some of its features. They help to authenticate users and
                  prevent fraudulent use of user accounts. Without these
                  Cookies, the services that You have asked for cannot be
                  provided, and We only use these Cookies to provide You with
                  those services.
                </p>
              </li>
              <li>
                <p>
                  <strong>Cookies Policy / Notice Acceptance Cookies</strong>
                </p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies identify if users have accepted the use
                  of cookies on the Website.
                </p>
              </li>
              <li>
                <p>
                  <strong>Functionality Cookies</strong>
                </p>
                <p>Type: Persistent Cookies</p>
                <p>Administered by: Us</p>
                <p>
                  Purpose: These Cookies allow us to remember choices You make
                  when You use the Website, such as remembering your login
                  details or language preference. The purpose of these Cookies
                  is to provide You with a more personal experience and to avoid
                  You having to re-enter your preferences every time You use the
                  Website.
                </p>
              </li>
            </ul>
            <p>
              For more information about the cookies we use and your choices
              regarding cookies, please visit our Cookies Policy or the Cookies
              section of our Privacy Policy.
            </p>
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={8} className={classes.bottomGrid}>
          <Typography variant="h4" className={classes.subheader}>
            Changes to this Privacy Policy
          </Typography>
          <Typography align={"justify"} className={classes.bodyContent}>
            We may update Our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update the "Last
            updated" date at the top of this Privacy Policy. You are advised to
            review this Privacy Policy periodically for any changes. Changes to
            this Privacy Policy are effective when they are posted on this page.
          </Typography>
        </Grid>
        <Footer />
      </Grid>
    </div>
  );
}
