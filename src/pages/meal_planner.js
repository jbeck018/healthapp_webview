import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import MealPlannerApp from "../components/MealPlannerApp"

const MealPlannerPage = () => (
  <Layout>
    <SEO title="Home" />
    <MealPlannerApp />
  </Layout>
)

export default MealPlannerPage
