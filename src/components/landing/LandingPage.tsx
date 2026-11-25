"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { cookies } from "next/headers";

// @ts-expect-error Stylesheets are loaded by the Next.js bundler.
import "./landing.scss";
import "swiper/css";
import "swiper/css/pagination";
import { useGetMatchesLandingQuery } from "src/slices/api/apiSlice";

const sponsorships = [
  {
    name: "Bronce",
    amount: "$1,000",
    description: "Forma parte del crecimiento de nuestro club.",
    icon: "ri-medal-line",
  },
  {
    name: "Patrocinador",
    amount: "Apoya al club",
    description: "Impulsa el desarrollo deportivo de nuestros jugadores.",
    icon: "ri-shield-star-line",
  },
  {
    name: "Beca a un Vaquero",
    amount: "$30,000",
    description:
      "Contribuye directamente al desarrollo y oportunidades de un jugador.",
    icon: "ri-trophy-line",
    featured: true,
  },
];

const LandingPage = (user: any) => {
  const [isNavbarShrunk, setIsNavbarShrunk] = useState(false);
  const { data, isLoading, error } = useGetMatchesLandingQuery();

  const next = data?.next;
  const last = data?.last;

  console.log({ next, last });

  useEffect(() => {
    const handleScroll = () => {
      setIsNavbarShrunk(window.scrollY >= 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="vaqueros-landing">
      {/* NAVBAR */}
      <nav
        className={`navbar navbar-expand-lg fixed-top vr-navbar ${
          isNavbarShrunk ? "is-sticky" : ""
        }`}
      >
        <div className="container">
          <Link
            href="/"
            className="navbar-brand d-flex align-items-center gap-2"
          >
            <Image
              src="/images/vaqueros-logo.png"
              alt="Vaqueros Reynosa"
              width={48}
              height={48}
            />
            <div className="vr-brand">
              <strong>VAQUEROS</strong>
              <span>REYNOSA FC</span>
            </div>
          </Link>

          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#vrNavbar"
            aria-controls="vrNavbar"
            aria-expanded="false"
            aria-label="Abrir menú"
          >
            <i className="ri-menu-line fs-24" />
          </button>

          <div className="collapse navbar-collapse" id="vrNavbar">
            <ul className="navbar-nav mx-auto gap-lg-3">
              <li className="nav-item">
                <Link href="#inicio" className="nav-link">
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#club" className="nav-link">
                  El club
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#partidos" className="nav-link">
                  Partidos
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#aficion" className="nav-link">
                  Afición
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#patrocinios" className="nav-link">
                  Patrocinios
                </Link>
              </li>
            </ul>

            <div className="d-flex gap-2 mt-3 mt-lg-0">
              {user ? (
                <Link href="/admin/users" className="btn vr-btn-outline">
                  Admin
                </Link>
              ) : (
                <Link href="/auth/login" className="btn vr-btn-outline">
                  Iniciar sesión
                </Link>
              )}
              <Link href="/boletos" className="btn vr-btn-gold">
                Comprar boletos
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="vr-hero" id="inicio">
        <div className="vr-hero-overlay" />

        <div className="container position-relative">
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-7">
              <div className="vr-hero-content">
                <div className="vr-eyebrow">
                  <span />
                  ORGULLO DE REYNOSA
                </div>

                <h1>
                  UNA CIUDAD.
                  <br />
                  UNA PASIÓN.
                  <br />
                  <span>UN EQUIPO.</span>
                </h1>

                <p className="vr-hero-description">
                  Somos Vaqueros Reynosa FC. Representamos nuestra ciudad dentro
                  y fuera de la cancha. Esto apenas comienza.
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <Link href="/boletos" className="btn vr-btn-gold btn-lg">
                    <i className="ri-ticket-2-line me-2" />
                    Vive el partido
                  </Link>

                  <Link href="#club" className="btn vr-btn-outline btn-lg">
                    Conoce al club
                    <i className="ri-arrow-right-line ms-2" />
                  </Link>
                </div>

                <div className="vr-hero-social mt-5">
                  <span>SÍGUENOS</span>
                  <a
                    href="https://www.facebook.com/profile.php?id=61592033866251"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-facebook-fill" />
                  </a>
                  <a
                    href="https://www.instagram.com/vaquerosreynosafc_oficial/"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-instagram-line" />
                  </a>
                  <a
                    href="#"
                    aria-label="TikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="ri-tiktok-fill" />
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-5 d-none d-lg-flex justify-content-center">
              <div className="vr-hero-emblem">
                <Image
                  src="/images/vaqueros-logo.png"
                  alt="Escudo Vaqueros Reynosa FC"
                  width={370}
                  height={370}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="vr-hero-bottom">
          <span>VAQUEROS REYNOSA FC</span>
          <span>EL ORGULLO DE NUESTRA TIERRA</span>
        </div>
      </section>

      {/* INTRO */}
      <section className="vr-intro section" id="club">
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6">
              <div className="vr-section-label">
                <span>01</span> NUESTRA IDENTIDAD
              </div>

              <h2 className="vr-section-title">
                MÁS QUE UN EQUIPO.
                <br />
                <span>UNA COMUNIDAD.</span>
              </h2>

              <p className="vr-muted mt-4">
                Vaqueros Reynosa FC nace con una visión: construir un proyecto
                deportivo que represente a nuestra ciudad, impulse el talento y
                conecte a toda una comunidad a través del fútbol.
              </p>

              <p className="vr-muted">
                Queremos que cada partido sea una oportunidad para demostrar
                nuestra identidad, pasión y compromiso.
              </p>

              <Link href="/club" className="vr-text-link">
                CONOCE NUESTRA HISTORIA
                <i className="ri-arrow-right-line ms-2" />
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="vr-image-frame">
                <Image
                  src="/images/vaqueros-logo.png"
                  alt="Vaqueros Reynosa FC"
                  width={750}
                  height={550}
                  className="img-fluid"
                />
                <div className="vr-image-caption">
                  <strong>VAQUEROS REYNOSA</strong>
                  <span>HECHOS PARA COMPETIR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTIDOS */}
      <section className="vr-matches section" id="partidos">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-md-8">
              <div className="vr-section-label">
                <span>02</span> DENTRO DE LA CANCHA
              </div>

              <h2 className="vr-section-title text-white">
                EL SIGUIENTE <span>DESAFÍO.</span>
              </h2>

              <p className="vr-muted">
                Sigue nuestros encuentros y acompaña al equipo en cada jornada.
              </p>
            </div>

            <div className="col-md-4 text-md-end">
              <Link href="/partidos" className="vr-text-link">
                VER TODOS LOS PARTIDOS
                <i className="ri-arrow-right-line ms-2" />
              </Link>
            </div>
          </div>

          <div className="row g-4">
            {/* ÚLTIMO PARTIDO */}
            {last && (
              <div className="col-lg-6">
                <div className="vr-match-card">
                  <div className="vr-match-status">
                    <span />
                    ÚLTIMO RESULTADO · {last.jornada}
                  </div>

                  <div className="vr-match-content">
                    {/* LOCAL */}
                    <div className="vr-match-team">
                      <Image
                        src={last.home.logo ?? "/images/team-placeholder.png"}
                        alt={last.home.name}
                        width={95}
                        height={95}
                      />
                      <strong>{last.home.name}</strong>
                    </div>

                    {/* RESULTADO */}
                    <div className="vr-match-info">
                      <span>FINAL</span>
                      <strong>
                        {last.home.score} - {last.away.score}
                      </strong>
                      <small className={`result-${last.result}`}>
                        {last.resultLabel.toUpperCase()}
                      </small>
                    </div>

                    {/* VISITANTE */}
                    <div className="vr-match-team">
                      <Image
                        src={last.away.logo ?? "/images/team-placeholder.png"}
                        alt={last.away.name}
                        width={95}
                        height={95}
                      />
                      <strong>{last.away.name}</strong>
                    </div>
                  </div>

                  <div className="vr-match-footer">
                    <span>EL RESULTADO SE CONSTRUYE EN EQUIPO.</span>

                    <Link href="/partidos">
                      Ver resultados
                      <i className="ri-arrow-right-line ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* PRÓXIMO PARTIDO */}
            {next && (
              <div className="col-lg-6">
                <div className="vr-match-card">
                  <div className="vr-match-status">
                    <span />
                    PRÓXIMO ENCUENTRO · {next.jornada}
                  </div>

                  <div className="vr-match-content">
                    {/* LOCAL */}
                    <div className="vr-match-team">
                      <Image
                        src={next.home.logo ?? "/images/team-placeholder.png"}
                        alt={next.home.name}
                        width={95}
                        height={95}
                      />
                      <strong>{next.home.name}</strong>
                    </div>

                    {/* FECHA */}
                    <div className="vr-match-info">
                      <span>VS</span>
                      <strong>{next.date}</strong>
                      <small>
                        {next.dateLabel.split(" ").slice(1).join(" ")}
                      </small>
                    </div>

                    {/* VISITANTE */}
                    <div className="vr-match-team">
                      <Image
                        src={next.away.logo ?? "/images/team-placeholder.png"}
                        alt={next.away.name}
                        width={95}
                        height={95}
                      />
                      <strong>{next.away.name}</strong>
                    </div>
                  </div>

                  <div className="vr-match-footer">
                    <span>
                      {next.condition === "visita"
                        ? `VISITAMOS · ${next.venue}`
                        : `JUGAMOS EN CASA · ${next.venue}`}
                    </span>

                    <Link href="/partidos">
                      Calendario completo
                      <i className="ri-arrow-right-line ms-2" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-4">
            <Link href="/historial" className="vr-text-link">
              CONSULTAR HISTORIAL DE PARTIDOS
              <i className="ri-arrow-right-line ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* AFICIÓN */}
      <section className="vr-fans section" id="aficion">
        <div className="container">
          <div className="text-center mb-5">
            <div className="vr-section-label justify-content-center">
              <span>03</span> SOMOS VAQUEROS
            </div>

            <h2 className="vr-section-title">
              EL EQUIPO ES DE <span>TODOS.</span>
            </h2>

            <p className="vr-muted mx-auto vr-max-description">
              Queremos que formes parte de esta historia. Vive los partidos,
              apoya al equipo y mantente conectado con Vaqueros Reynosa.
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
          >
            <SwiperSlide>
              <div className="vr-fan-card">
                <div className="vr-fan-icon">
                  <i className="ri-ticket-2-line" />
                </div>
                <h4>Vive los partidos</h4>
                <p>
                  Compra tus boletos y acompaña a Vaqueros desde las gradas.
                </p>
                <Link href="/boletos">
                  COMPRAR BOLETOS
                  <i className="ri-arrow-right-line ms-2" />
                </Link>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="vr-fan-card">
                <div className="vr-fan-icon">
                  <i className="ri-user-add-line" />
                </div>
                <h4>Forma parte del club</h4>
                <p>
                  Regístrate y mantente conectado con todas las actividades de
                  Vaqueros Reynosa.
                </p>
                <Link href="/auth/register">
                  REGISTRARME
                  <i className="ri-arrow-right-line ms-2" />
                </Link>
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="vr-fan-card">
                <div className="vr-fan-icon">
                  <i className="ri-heart-3-line" />
                </div>
                <h4>Apoya a Vaqueros</h4>
                <p>Contribuye al crecimiento de nuestro proyecto deportivo.</p>
                <Link href="#patrocinios">
                  CONOCER APOYOS
                  <i className="ri-arrow-right-line ms-2" />
                </Link>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* PATROCINIOS */}
      <section className="vr-sponsors section" id="patrocinios">
        <div className="container">
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <div className="vr-section-label justify-content-center">
                <span>04</span> CRECEMOS JUNTOS
              </div>

              <h2 className="vr-section-title text-white">
                SÉ PARTE DE <span>ESTA HISTORIA.</span>
              </h2>

              <p className="vr-muted">
                El crecimiento de Vaqueros Reynosa es posible gracias a personas
                y empresas que creen en el deporte y en el talento de nuestra
                ciudad.
              </p>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {sponsorships.map(item => (
              <div className="col-lg-4 col-md-6" key={item.name}>
                <div
                  className={`vr-sponsor-card ${
                    item.featured ? "featured" : ""
                  }`}
                >
                  <div className="vr-sponsor-icon">
                    <i className={item.icon} />
                  </div>

                  <h4>{item.name}</h4>
                  <h2>{item.amount}</h2>
                  <p>{item.description}</p>

                  <Link href="/patrocinios" className="btn vr-btn-gold w-100">
                    QUIERO APOYAR
                    <i className="ri-arrow-right-line ms-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <p className="vr-muted">
              ¿Representas una empresa y quieres colaborar con nosotros?
            </p>
            <Link href="#contacto" className="vr-text-link">
              CONOCE LAS OPCIONES DE PATROCINIO
              <i className="ri-arrow-right-line ms-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vr-cta">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-8">
              <span>EL FUTURO SE CONSTRUYE JUNTOS</span>
              <h2>
                REYNOSA TIENE
                <br />
                <strong>UN EQUIPO.</strong>
              </h2>
              <p>
                Sé parte de Vaqueros. Nuestra historia también puede ser la
                tuya.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <Link href="/auth/register" className="btn vr-btn-dark btn-lg">
                ÚNETE A VAQUEROS
                <i className="ri-arrow-right-line ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="vr-contact section" id="contacto">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-6">
              <div className="vr-section-label">
                <span>05</span> ESTAMOS EN CONTACTO
              </div>

              <h2 className="vr-section-title">
                HABLEMOS DE <span>FÚTBOL.</span>
              </h2>

              <p className="vr-muted">
                ¿Quieres ser patrocinador, colaborar con el club o conocer más
                sobre nuestro proyecto? Nos encantaría escucharte.
              </p>

              <Link href="/contacto" className="btn vr-btn-gold mt-3">
                CONTACTAR AL CLUB
                <i className="ri-arrow-right-line ms-2" />
              </Link>
            </div>

            <div className="col-lg-6">
              <div className="vr-contact-card">
                <div className="vr-contact-item">
                  <i className="ri-map-pin-line" />
                  <div>
                    <strong>UBICACIÓN</strong>
                    <span>Reynosa, Tamaulipas, México</span>
                  </div>
                </div>

                <div className="vr-contact-item">
                  <i className="ri-instagram-line" />
                  <div>
                    <strong>INSTAGRAM</strong>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Síguenos en redes sociales
                    </a>
                  </div>
                </div>

                <div className="vr-contact-item">
                  <i className="ri-facebook-circle-line" />
                  <div>
                    <strong>FACEBOOK</strong>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      Vaqueros Reynosa FC
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="vr-footer">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-lg-4">
              <div className="d-flex align-items-center gap-3">
                <Image
                  src="/images/vaqueros-logo.png"
                  alt="Vaqueros Reynosa FC"
                  width={55}
                  height={55}
                />
                <div className="vr-brand">
                  <strong>VAQUEROS</strong>
                  <span>REYNOSA FC</span>
                </div>
              </div>
              <p className="vr-muted mt-3">
                Una ciudad. Una pasión. Un equipo.
              </p>
            </div>

            <div className="col-lg-4">
              <div className="vr-footer-links">
                <Link href="#club">El club</Link>
                <Link href="/partidos">Partidos</Link>
                <Link href="/boletos">Boletos</Link>
                <Link href="#patrocinios">Patrocinios</Link>
                <Link href="/contacto">Contacto</Link>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end">
              <div className="vr-footer-social">
                <a
                  href="https://www.facebook.com/profile.php?id=61592033866251"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-facebook-fill" />
                </a>
                <a
                  href="https://www.instagram.com/vaquerosreynosafc_oficial/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-instagram-line" />
                </a>
                <a
                  href="#"
                  aria-label="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="ri-tiktok-fill" />
                </a>
              </div>
            </div>
          </div>

          <div className="vr-footer-bottom">
            <span>
              © {new Date().getFullYear()} Vaqueros Reynosa FC. Todos los
              derechos reservados.
            </span>
            <span>HECHOS EN REYNOSA.</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;
